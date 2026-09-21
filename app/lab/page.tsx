import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { LabList } from "@/components/lab-list";
import { getAllLabPosts } from "@/lib/lab";
import { pageMetadata } from "@/lib/metadata";

const LAB_DESCRIPTION = "직접 구현하고 검증한 내용을 기록했습니다.";

export const metadata: Metadata = pageMetadata({
  title: "Lab — 윤대현",
  description: LAB_DESCRIPTION,
});

export default async function LabPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) {
  const [posts, params] = await Promise.all([getAllLabPosts(), searchParams]);

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
        <p className="mt-2 max-w-[65ch] text-base text-muted-foreground">
          {LAB_DESCRIPTION}
        </p>

        <div className="mt-10">
          <LabList posts={posts} params={params} />
        </div>
      </Container>
    </main>
  );
}
