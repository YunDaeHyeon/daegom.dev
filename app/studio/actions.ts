"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { closeStudioSession, getStudioUser, openStudioSession } from "@/lib/studio/session";
import { createUploadTicket, type UploadTicket } from "@/lib/studio/s3";
import { deletePost, saveExistingPost, saveNewPost } from "@/lib/studio/posts";
import type { PostDraft, Result } from "@/lib/studio/types";

const LOGIN_REQUIRED = { ok: false, error: "로그인이 필요합니다." } as const;

/** 게시·수정·삭제 직후 공개 페이지가 1시간을 기다리지 않고 바로 바뀌게 한다. */
function refreshPublicPages() {
  revalidateTag("lab-posts", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/lab");
  revalidatePath("/lab/[slug]", "page");
}

export async function startSession(idToken: string): Promise<Result> {
  const opened = await openStudioSession(idToken);
  return opened ? { ok: true } : { ok: false, error: "이 계정은 사용할 수 없습니다." };
}

export async function endSession(): Promise<Result> {
  await closeStudioSession();
  return { ok: true };
}

export async function requestImageUpload(input: {
  postId: string;
  contentType: string;
  size: number;
}): Promise<Result<{ ticket: UploadTicket }>> {
  if (!(await getStudioUser())) return LOGIN_REQUIRED;
  try {
    return { ok: true, ticket: await createUploadTicket(input) };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "업로드를 준비하지 못했습니다." };
  }
}

export async function publishPost(input: PostDraft & { isNew: boolean }): Promise<Result<{ slug: string }>> {
  if (!(await getStudioUser())) return LOGIN_REQUIRED;

  const { isNew, ...draft } = input;
  const result = isNew ? await saveNewPost(draft) : await saveExistingPost(draft);
  if (result.ok) refreshPublicPages();
  return result;
}

export async function removePost(slug: string): Promise<Result> {
  if (!(await getStudioUser())) return LOGIN_REQUIRED;

  const result = await deletePost(slug);
  if (result.ok) refreshPublicPages();
  return result;
}
