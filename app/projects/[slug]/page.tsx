import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectDetailContent } from "@/components/project-detail-content";
import { projectItems, decisions } from "@/lib/content";

export function generateStaticParams() {
  return projectItems.map((item) => ({ slug: item.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = projectItems.find((w) => w.slug === slug);
  if (!item) notFound();

  const related = decisions.filter((d) =>
    item.relatedDecisions?.includes(d.slug)
  );

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← Projects
        </Link>
        <div className="mt-6">
          <ProjectDetailContent item={item} related={related} />
        </div>
      </Container>
    </main>
  );
}
