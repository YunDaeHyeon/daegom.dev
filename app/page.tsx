import Link from "next/link";
import { Container } from "@/components/container";
import { StatusLabel, type Status } from "@/components/status-label";

type WorkItem = {
  title: string;
  period: string;
  summary: string;
  stack: string[];
};

// Placeholder entries — replace with real projects once content is provided.
const workItems: WorkItem[] = [
  {
    title: "Placeholder Project A",
    period: "2023 — 2024",
    summary: "One-line, honest description of scope and actual contribution.",
    stack: ["Swift", "SwiftUI"],
  },
  {
    title: "Placeholder Project B",
    period: "2022 — 2023",
    summary: "One-line, honest description of scope and actual contribution.",
    stack: ["Swift", "UIKit", "Combine"],
  },
  {
    title: "Placeholder Project C",
    period: "2021 — 2022",
    summary: "One-line, honest description of scope and actual contribution.",
    stack: ["Swift", "SwiftUI", "Core Data"],
  },
];

type Decision = {
  title: string;
  date: string;
  summary: string;
  status: Status;
};

// Placeholder entries — replace with real decisions once content is provided.
// Discontinued/paused items are listed with the same visual weight as shipped
// ones; status is informational, not a judgment.
const decisions: Decision[] = [
  {
    title: "Placeholder Decision A",
    date: "2024-03",
    summary: "One-line, honest account of what was decided and why.",
    status: "SHIPPED",
  },
  {
    title: "Placeholder Decision B",
    date: "2023-11",
    summary: "One-line, honest account of what was tried and what changed.",
    status: "DISCONTINUED",
  },
  {
    title: "Placeholder Decision C",
    date: "2023-06",
    summary: "One-line, honest account of the current state and why it paused.",
    status: "PAUSED",
  },
  {
    title: "Placeholder Decision D",
    date: "2024-09",
    summary: "One-line, honest account of what is currently in motion.",
    status: "IN PROGRESS",
  },
];

export default function Home() {
  return (
    <>
      <section
        id="top"
        tabIndex={-1}
        className="flex min-h-dvh scroll-mt-20 items-center py-24 focus:outline-none sm:py-32"
      >
        <Container>
          <div className="max-w-[42ch]">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              daegom
            </h1>
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              iOS Developer
            </p>
            <p className="mt-8 max-w-[65ch] text-lg leading-8 text-muted-foreground">
              I build for iOS and write down what actually happened along the
              way — including the parts that didn&apos;t work.
            </p>
            <div className="mt-10 flex items-center gap-8 text-sm">
              <Link
                href="#work"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                See the work
              </Link>
              <Link
                href="#decisions"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                Read the decisions
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="work"
        tabIndex={-1}
        className="min-h-dvh scroll-mt-20 border-t border-border py-16 focus:outline-none sm:py-24"
      >
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Work
          </h2>
          <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
            Placeholder entries — replace with real projects once content is
            provided.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {workItems.map((item) => (
              <li key={item.title} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="decisions"
        tabIndex={-1}
        className="min-h-dvh scroll-mt-20 border-t border-border py-16 focus:outline-none sm:py-24"
      >
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Decisions
          </h2>
          <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
            A record of choices made along the way, including ones that were
            paused or discontinued. Placeholder entries — replace with real
            content once provided.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {decisions.map((decision) => (
              <li key={decision.title} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    {decision.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {decision.date}
                    </span>
                    <StatusLabel status={decision.status} />
                  </div>
                </div>
                <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
                  {decision.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
