import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { LabContent } from "@/components/lab-content";
import { StackTags } from "@/components/stack-tags";
import { getLabPostBySlug, formatLabDate, LAB_TYPE_LABELS } from "@/lib/lab";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

// Next/Turbopack does not reliably decode non-ASCII dynamic segments here,
// so decode defensively (safe no-op if it's already decoded).
function decodeSlug(rawSlug: string) {
  try {
    return decodeURIComponent(rawSlug);
  } catch {
    // rawSlug wasn't percent-encoded; use as-is
    return rawSlug;
  }
}

/** 마크다운 기호를 걷어내고 미리보기에 쓸 첫 문단을 만든다. */
function toDescription(markdown: string, fallback: string) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[>#\-*|\s]+/gm, " ")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return fallback;
  return text.length > 120 ? `${text.slice(0, 120)}…` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const post = await getLabPostBySlug(decodeSlug(rawSlug));
  if (!post) return {};

  return pageMetadata({
    title: `${post.title} — Lab · 윤대현`,
    description: toDescription(
      post.content,
      `윤대현의 Lab 기록 (${LAB_TYPE_LABELS[post.type]})`
    ),
    type: "article",
  });
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const post = await getLabPostBySlug(decodeSlug(rawSlug));
  if (!post) notFound();

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href="/lab"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← Lab
        </Link>

        <div className="mx-auto max-w-[70ch]">
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <LabTypeBadge type={post.type} />
            <span className="font-mono text-sm text-muted-foreground">
              {formatLabDate(post.createdAt)}
            </span>
          </div>
          <StackTags stack={post.stack} />

          <LabContent markdown={post.content} />
        </div>
      </Container>
    </main>
  );
}
