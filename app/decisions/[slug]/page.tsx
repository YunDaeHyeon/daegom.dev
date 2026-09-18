import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { DecisionDetailContent } from "@/components/decision-detail-content";
import { decisions, projectItems } from "@/lib/content";

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

  const relatedProject = projectItems.find((w) => w.slug === decision.relatedProject);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href={relatedProject ? `/projects/${relatedProject.slug}` : "/#projects"}
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← {relatedProject ? relatedProject.title : "Projects"}
        </Link>
        <div className="mt-6">
          <DecisionDetailContent decision={decision} relatedProject={relatedProject} />
        </div>
      </Container>
    </main>
  );
}
