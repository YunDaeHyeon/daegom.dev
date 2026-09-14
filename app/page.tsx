import Link from "next/link";
import { Container } from "@/components/container";
import { StatusLabel } from "@/components/status-label";
import { ProfilePhoto } from "@/components/profile-photo";
import { LinkRow } from "@/components/link-row";
import { workItems, decisions } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section
        id="top"
        tabIndex={-1}
        className="flex min-h-dvh scroll-mt-20 items-center py-24 focus:outline-none sm:py-32"
      >
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="min-w-[280px] max-w-[65ch] flex-1">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                윤대현 · YunDaeHyeon
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">iOS Developer</p>
              <p className="mt-8 max-w-[65ch] text-lg leading-8 text-foreground">
                기기와 사람을 잇는 경험을 만듭니다.
              </p>
              <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-7 text-muted-foreground">
                <p>
                  AI에게는 답보다 이유를 먼저 묻습니다. 무엇이 문제인지 정의하는 일은 사람의 몫이라고 생각합니다.
                  <br />
                  문제가 생기면 코드보다 그 아래에서 무엇이 어떻게 동작하는지를 먼저 확인합니다.
                </p>
                <p>
                  개발자가 의도한 대로 동작하는 것과 사용자가 실제로 경험하는 것은 다르다고 생각합니다.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-8 text-sm">
                <Link
                  href="#work"
                  className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  작업물 보기
                </Link>
                <Link
                  href="#decisions"
                  className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  의사결정 기록 보기
                </Link>
              </div>
            </div>
            <ProfilePhoto />
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
            직접 참여한 프로젝트에서 실제로 담당한 범위를 정리했습니다.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {workItems.map((item) => (
              <li key={item.slug} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    <Link
                      href={`/work/${item.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border"
                    >
                      {item.title}
                    </Link>
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
                <LinkRow links={item.links} />
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
            중단되거나 보류된 것도 포함해, 그 과정에서 있었던 판단을 그대로
            남깁니다.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {decisions.map((decision) => (
              <li key={decision.slug} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-medium text-foreground">
                    <Link
                      href={`/decisions/${decision.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border"
                    >
                      {decision.title}
                    </Link>
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
                <LinkRow links={decision.links} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
