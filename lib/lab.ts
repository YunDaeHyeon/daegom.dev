import "server-only";
import { getDb } from "@/lib/firebase-admin";
import type { LabPost, LabPostSummary } from "@/lib/lab-types";

export type { LabType, LabPost, LabPostSummary } from "@/lib/lab-types";
export { LAB_TYPE_LABELS, formatLabDate } from "@/lib/lab-types";

export async function getAllLabPosts(): Promise<LabPostSummary[]> {
  const db = getDb();
  const snap = await db.collection("labPosts").orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => {
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

export async function getLabPostBySlug(slug: string): Promise<LabPost | null> {
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
}
