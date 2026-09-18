import Link from "next/link";
import { DetailSections } from "@/components/detail-sections";
import { LinkRow } from "@/components/link-row";
import { StatusLabel } from "@/components/status-label";
import type { Decision, ProjectItem } from "@/lib/content";

export function DecisionDetailContent({
  decision,
  relatedProject,
}: {
  decision: Decision;
  relatedProject: ProjectItem | undefined;
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

      <div className="mt-10">
        <DetailSections sections={decision.sections} />
      </div>

      {relatedProject && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-foreground">
            관련 프로젝트
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                {relatedProject.title}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
