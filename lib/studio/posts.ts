import "server-only";
import { getDb } from "@/lib/firebase-admin";
import { LAB_TYPE_LABELS, type LabType } from "@/lib/lab-types";
import { isUsableSlug } from "@/lib/studio/slug";
import type { PostDraft, Result } from "@/lib/studio/types";

const MAX_CONTENT_CHARS = 400_000;

type Cleaned = Omit<PostDraft, "slug"> & { slug: string };

function clean(input: PostDraft): { ok: true; post: Cleaned } | { ok: false; error: string } {
  const title = input.title.trim();
  if (!title) return { ok: false, error: "제목을 입력해 주세요." };
  if (title.length > 120) return { ok: false, error: "제목은 120자 이하로 입력해 주세요." };

  const slug = input.slug.normalize("NFC");
  if (!isUsableSlug(slug) || /[\/\\?#%\[\]\s]/.test(slug)) {
    return { ok: false, error: "글 주소에 사용할 수 없는 문자가 있습니다." };
  }

  if (!(input.type in LAB_TYPE_LABELS)) return { ok: false, error: "분류를 선택해 주세요." };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(Date.parse(`${input.date}T00:00:00Z`))) {
    return { ok: false, error: "날짜 형식이 올바르지 않습니다." };
  }

  if (!input.content.trim()) return { ok: false, error: "본문을 입력해 주세요." };
  if (input.content.length > MAX_CONTENT_CHARS) return { ok: false, error: "본문이 너무 깁니다." };

  const stack = [...new Set(input.stack.map((tag) => tag.trim()).filter(Boolean))];
  if (stack.length > 12 || stack.some((tag) => tag.length > 30)) {
    return { ok: false, error: "태그는 12개 이하, 각 30자 이하로 입력해 주세요." };
  }

  return { ok: true, post: { ...input, title, slug, stack } };
}

/** 본문 속 이미지 주소를 모아 문서의 images 필드에 넣는다. */
function extractImages(content: string): string[] {
  const urls = [...content.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  return [...new Set(urls)];
}

/** 날짜만 바뀐 게 아니면 기존 시각을 그대로 둔다. 없으면 한국 시간 정오로 저장한다. */
function resolveCreatedAt(date: string, existing?: { createdAt: string; dateApprox: boolean }) {
  if (existing && existing.createdAt.slice(0, 10) === date) {
    return { createdAt: existing.createdAt, dateApprox: existing.dateApprox };
  }
  return { createdAt: `${date}T03:00:00.000Z`, dateApprox: false };
}

export async function saveNewPost(input: PostDraft): Promise<Result<{ slug: string }>> {
  const cleaned = clean(input);
  if (!cleaned.ok) return cleaned;
  const post = cleaned.post;

  try {
    await getDb()
      .collection("labPosts")
      .doc(post.slug)
      .create({
        slug: post.slug,
        title: post.title,
        type: post.type,
        source: "admin",
        sourceUrl: null,
        ...resolveCreatedAt(post.date),
        pinned: false,
        stack: post.stack,
        images: extractImages(post.content),
        content: post.content,
        updatedAt: new Date().toISOString(),
      });
  } catch (error) {
    // gRPC ALREADY_EXISTS
    if ((error as { code?: number }).code === 6) {
      return { ok: false, error: "같은 주소의 글이 이미 있습니다. 제목이나 주소를 바꿔 주세요." };
    }
    throw error;
  }
  return { ok: true, slug: post.slug };
}

export async function saveExistingPost(input: PostDraft): Promise<Result<{ slug: string }>> {
  const cleaned = clean(input);
  if (!cleaned.ok) return cleaned;
  const post = cleaned.post;

  const ref = getDb().collection("labPosts").doc(post.slug);
  const snapshot = await ref.get();
  if (!snapshot.exists) return { ok: false, error: "수정하려는 글을 찾을 수 없습니다." };

  const existing = snapshot.data()!;
  await ref.update({
    title: post.title,
    type: post.type as LabType,
    stack: post.stack,
    images: extractImages(post.content),
    content: post.content,
    ...resolveCreatedAt(post.date, existing as { createdAt: string; dateApprox: boolean }),
    updatedAt: new Date().toISOString(),
  });
  return { ok: true, slug: post.slug };
}

/** 삭제 전에 사본을 labTrash에 남겨 실수로 지워도 되돌릴 수 있게 한다. */
export async function deletePost(rawSlug: string): Promise<Result> {
  const slug = rawSlug.normalize("NFC");
  if (!isUsableSlug(slug) || /[\/\\?#%\[\]\s]/.test(slug)) {
    return { ok: false, error: "글 주소가 올바르지 않습니다." };
  }

  const db = getDb();
  const ref = db.collection("labPosts").doc(slug);
  const snapshot = await ref.get();
  if (!snapshot.exists) return { ok: false, error: "삭제하려는 글을 찾을 수 없습니다." };

  const batch = db.batch();
  batch.set(db.collection("labTrash").doc(`${snapshot.id}__${Date.now()}`), {
    ...snapshot.data(),
    deletedAt: new Date().toISOString(),
  });
  batch.delete(ref);
  await batch.commit();
  return { ok: true };
}
