import Link from "next/link";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
import type { WorkItem, Decision } from "@/lib/content";

export function WorkDetailContent({
  item,
  related,
}: {
  item: WorkItem;
  related: Decision[];
}) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {item.title}
      </h1>
      <p className="mt-2 font-mono text-sm text-muted-foreground">
        {item.period}
      </p>
      <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
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
    </>
  );
}
