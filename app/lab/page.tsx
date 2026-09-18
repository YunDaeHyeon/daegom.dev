import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { LabList } from "@/components/lab-list";
import { getAllLabPosts } from "@/lib/lab";

export const revalidate = 3600;

export default async function LabPage() {
  const posts = await getAllLabPosts();

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

        <div className="mt-10">
          <Suspense fallback={null}>
            <LabList posts={posts} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
