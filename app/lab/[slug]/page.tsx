import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { LabContent } from "@/components/lab-content";
import { StackTags } from "@/components/stack-tags";
import { getLabPostBySlug, formatLabDate } from "@/lib/lab";

export const revalidate = 3600;

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  // Next/Turbopack does not reliably decode non-ASCII dynamic segments here,
  // so decode defensively (safe no-op if it's already decoded).
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // rawSlug wasn't percent-encoded; use as-is
  }
  const post = await getLabPostBySlug(slug);
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
