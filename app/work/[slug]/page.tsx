import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
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

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {item.period}
        </p>
        <p className="mt-6 max-w-[65ch] text-lg leading-8 text-muted-foreground">
          {item.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
        <LinkRow links={item.links} />

        <DetailSections sections={item.sections} />

        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-foreground">
              관련 Decisions
            </h2>
            <ul className="mt-3 space-y-2">
              {related.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/decisions/${d.slug}`}
                    className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </main>
  );
}
