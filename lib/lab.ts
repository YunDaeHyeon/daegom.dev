import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";
import type { LabPost, LabPostSummary } from "@/lib/lab-types";

export type { LabType, LabPost, LabPostSummary } from "@/lib/lab-types";
export { LAB_TYPE_LABELS, formatLabDate } from "@/lib/lab-types";

/** 캐시를 거치지 않고 Firestore에서 바로 읽는다. 글 관리 화면처럼 항상 최신이어야 하는 곳에서 쓴다. */
export async function getAllLabPostsFresh(): Promise<LabPostSummary[]> {
  const db = getDb();
  const snap = await db.collection("labPosts").orderBy("createdAt", "desc").get();
  return snap.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data();
    return {
      slug: data.slug,
      title: data.title,
      type: data.type,
      source: data.source,
      createdAt: data.createdAt,
      dateApprox: !!data.dateApprox,
      pinned: !!data.pinned,
      stack: data.stack ?? [],
    };
  });
}

/** `/lab`은 필터·페이지를 검색 파라미터로 읽어 동적으로 렌더링되므로 세그먼트의
 *  `revalidate`가 적용되지 않는다. 목록 조회 자체를 캐시해 요청마다 119건을
 *  다시 읽지 않게 한다. */
export const getAllLabPosts = unstable_cache(getAllLabPostsFresh, ["lab-posts"], {
  revalidate: 3600,
  tags: ["lab-posts"],
});

/** 같은 요청 안에서 generateMetadata와 페이지가 각각 호출하므로 중복 조회를 막는다. */
export const getLabPostBySlug = cache(async function getLabPostBySlug(
  slug: string
): Promise<LabPost | null> {
  const db = getDb();
  const doc = await db.collection("labPosts").doc(slug.normalize("NFC")).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return {
    slug: data.slug,
    title: data.title,
    type: data.type,
    source: data.source,
    createdAt: data.createdAt,
    dateApprox: !!data.dateApprox,
    pinned: !!data.pinned,
    stack: data.stack ?? [],
    content: data.content,
    sourceUrl: data.sourceUrl ?? null,
  };
});
