import Link from "next/link";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
import { StatusLabel } from "@/components/status-label";
import type { Decision, WorkItem } from "@/lib/content";

export function DecisionDetailContent({
  decision,
  relatedWork,
}: {
  decision: Decision;
  relatedWork: WorkItem | undefined;
}) {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {decision.title}
      </h1>
      <div className="mt-2 flex items-center gap-4">
        <span className="font-mono text-sm text-muted-foreground">
          {decision.date}
        </span>
        <StatusLabel status={decision.status} />
      </div>
      <p className="mt-6 max-w-[65ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
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
    </>
  );
}
