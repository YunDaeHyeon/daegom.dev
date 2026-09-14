import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { WorkDetailContent } from "@/components/work-detail-content";
import { workItems, decisions } from "@/lib/content";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);
  if (!item) notFound();

  const related = decisions.filter((d) =>
    item.relatedDecisions?.includes(d.slug)
  );

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#work"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← Work
        </Link>
        <div className="mt-6">
          <WorkDetailContent item={item} related={related} />
        </div>
      </Container>
    </main>
  );
}
