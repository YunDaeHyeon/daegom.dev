import Image from "next/image";
import Link from "next/link";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
import { BadgeLink } from "@/components/badge-link";
import type { ProjectItem, Decision } from "@/lib/content";

export function ProjectDetailContent({
  item,
  related,
}: {
  item: ProjectItem;
  related: Decision[];
}) {
  return (
    <>
      <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {item.icon && (
          <Image
            src={item.icon}
            alt=""
            width={32}
            height={32}
            className="rounded-sm"
          />
        )}
        {item.title}
        {item.badge && <BadgeLink badge={item.badge} />}
      </h1>
      <p className="mt-2 font-mono text-sm text-muted-foreground">
        {item.period}
      </p>
      <p className="mt-6 max-w-[65ch] text-lg font-medium leading-8 text-foreground sm:text-xl sm:leading-9">
        {item.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-sm bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
      <LinkRow links={item.links} />

      <div className="mt-10">
        <DetailSections sections={item.sections} />
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-base font-semibold text-foreground">
            관련 Decisions
          </h2>
          <ul className="mt-3 space-y-2">
            {related.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/decisions/${d.slug}`}
                  className="text-base text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
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
