import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { LabList } from "@/components/lab-list";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { StackTags } from "@/components/stack-tags";
import { getAllLabPosts, formatLabDate } from "@/lib/lab";

export const revalidate = 3600;

export default async function LabPage() {
  const posts = await getAllLabPosts();
  const pinned = posts.filter((p) => p.pinned);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#lab"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Lab
        </h1>
        <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
          업무 밖에서 공부하거나 만들어본 것들의 기록입니다. 총 {posts.length}개.
        </p>

        {pinned.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-medium text-foreground">대표작</h2>
            <ul className="mt-3 divide-y divide-border border-t border-border">
              {pinned.map((post) => (
                <li key={post.slug} className="py-4">
                  <Link href={`/lab/${post.slug}`} className="block">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="text-sm font-medium text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border">
                        {post.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <LabTypeBadge type={post.type} />
                        <span className="font-mono text-xs text-muted-foreground">
                          {formatLabDate(post.createdAt)}
                        </span>
                      </span>
                    </div>
                    <StackTags stack={post.stack} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <Suspense fallback={null}>
            <LabList posts={posts} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
