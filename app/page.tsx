import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProfilePhoto } from "@/components/profile-photo";
import { BadgeLink } from "@/components/badge-link";
import { DetailSections } from "@/components/detail-sections";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { StackTags } from "@/components/stack-tags";
import { projectItems, about } from "@/lib/content";
import { getAllLabPosts, formatLabDate } from "@/lib/lab";

export const revalidate = 3600;

export default async function Home() {
  const labPosts = await getAllLabPosts();
  const latestLabPosts = labPosts.slice(0, 6);

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
                  href="#projects"
                  className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  프로젝트 보기
                </Link>
              </div>
            </div>
            <ProfilePhoto />
          </div>
        </Container>
      </section>

      <section
        id="projects"
        tabIndex={-1}
        className="scroll-mt-20 border-t border-border py-16 focus:outline-none sm:py-24"
      >
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Projects
          </h2>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {projectItems.map((item) => (
              <li key={item.slug} className="py-6 sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="flex items-center gap-2 text-base font-medium text-foreground">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                    )}
                    <Link
                      href={`/projects/${item.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border"
                    >
                      {item.title}
                    </Link>
                    {item.badge && <BadgeLink badge={item.badge} />}
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
        id="about"
        tabIndex={-1}
        className="scroll-mt-20 border-t border-border py-16 focus:outline-none sm:py-24"
      >
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            About
          </h2>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="text-base font-semibold text-foreground">학력</h3>
              <ul className="mt-4 divide-y divide-border">
                {about.education.map((entry) => (
                  <li
                    key={entry.school}
                    className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-sm text-foreground">
                      {entry.school} · {entry.major}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {entry.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground">활동</h3>
              <ul className="mt-4 divide-y divide-border">
                {about.experience.map((entry) => (
                  <li key={entry.org} className="py-4 first:pt-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="text-sm text-foreground">
                        {entry.org}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {entry.period}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {entry.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <DetailSections
              sections={[
                { heading: "자격증", items: about.certifications },
                { heading: "수상", items: about.awards },
                { heading: "멘토링 활동", items: about.mentoring },
              ]}
            />

            <div>
              <h3 className="text-base font-semibold text-foreground">Contact</h3>
              <div className="mt-4 flex flex-wrap gap-6 text-base">
                {about.contact.map((link) => {
                  const isExternal = !link.href.startsWith("mailto:");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="lab"
        tabIndex={-1}
        className="scroll-mt-20 border-t border-border py-16 focus:outline-none sm:py-24"
      >
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Lab
          </h2>
          <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
            직접 구현하고 검증한 내용을 기록했습니다.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {latestLabPosts.map((post) => (
              <li key={post.slug} className="py-4">
                <Link href={`/lab/${post.slug}`} className="block">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="text-sm text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border">
                      {post.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <LabTypeBadge type={post.type} />
                      <span className="font-mono text-xs text-muted-foreground">
                        {formatLabDate(post.createdAt)}
                      </span>
                    </span>
                  </div>
                  <StackTags stack={post.stack} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/lab"
            className="mt-8 inline-block text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            전체 보기 →
          </Link>
        </Container>
      </section>
    </>
  );
}
