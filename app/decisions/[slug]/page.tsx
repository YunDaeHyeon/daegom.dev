import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { DecisionDetailContent } from "@/components/decision-detail-content";
import { decisions, workItems } from "@/lib/content";

export function generateStaticParams() {
  return decisions.map((item) => ({ slug: item.slug }));
}

export default async function DecisionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decision = decisions.find((d) => d.slug === slug);
  if (!decision) notFound();

  const relatedWork = workItems.find((w) => w.slug === decision.relatedWork);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#decisions"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← Decisions
        </Link>
        <div className="mt-6">
          <DecisionDetailContent decision={decision} relatedWork={relatedWork} />
        </div>
      </Container>
    </main>
  );
}
