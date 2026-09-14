import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
import { StatusLabel } from "@/components/status-label";
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

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {decision.title}
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <span className="font-mono text-sm text-muted-foreground">
            {decision.date}
          </span>
          <StatusLabel status={decision.status} />
        </div>
        <p className="mt-6 max-w-[65ch] text-lg leading-8 text-muted-foreground">
          {decision.summary}
        </p>
        <LinkRow links={decision.links} />

        <DetailSections sections={decision.sections} />

        {relatedWork && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-foreground">
              관련 프로젝트
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`/work/${relatedWork.slug}`}
                  className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {relatedWork.title}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </main>
  );
}
