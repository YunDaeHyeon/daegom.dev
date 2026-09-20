import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProfilePhoto } from "@/components/profile-photo";
import { BadgeLink } from "@/components/badge-link";
import { ContactBadge } from "@/components/contact-badge";
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
              <p className="mt-3 text-sm text-muted-foreground">Mobile App Developer</p>
              <p className="mt-8 max-w-[65ch] break-keep text-lg leading-8 text-foreground">
                코드가 동작하는 것과 사용자가 쓸 수 있는 것은 다르다고 생각하는 개발자입니다.
              </p>
              <div className="mt-10">
                <Link
                  href="#projects"
                  className="text-base font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  프로젝트 보기
                </Link>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {about.contact.map((link) => (
                    <ContactBadge key={link.href} link={link} />
                  ))}
                </div>
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
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={22}
                        height={22}
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
                  <span className="font-mono text-sm text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 max-w-[65ch] text-base font-medium leading-7 text-foreground sm:text-lg sm:leading-8">
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
              </li>
            ))}
          </ul>
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
          <p className="mt-2 max-w-[65ch] text-base text-muted-foreground">
            직접 구현하고 검증한 내용을 기록했습니다.
          </p>

          <ul className="mt-10 divide-y divide-border border-t border-border">
            {latestLabPosts.map((post) => (
              <li key={post.slug} className="py-4">
                <Link href={`/lab/${post.slug}`} className="block">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="text-base text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border">
                      {post.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <LabTypeBadge type={post.type} />
                      <span className="font-mono text-sm text-muted-foreground">
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
              <h3 className="text-base font-semibold text-foreground">
                Stacks
              </h3>
              <dl className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {about.skills.map((skill) => (
                  <div key={skill.heading}>
                    <dt className="font-mono text-sm font-medium text-foreground">
                      {skill.heading}
                    </dt>
                    {skill.items.map((item) => (
                      <dd
                        key={item}
                        className="mt-2 break-keep text-base leading-7 text-muted-foreground"
                      >
                        {item}
                      </dd>
                    ))}
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground">학력</h3>
              <ul className="mt-4 divide-y divide-border">
                {about.education.map((entry) => (
                  <li key={entry.school} className="py-4 first:pt-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="text-base text-foreground">
                        {entry.school} · {entry.major}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {entry.period}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="mt-1 text-base text-muted-foreground">
                        {entry.note}
                      </p>
                    )}
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
                      <span className="text-base text-foreground">
                        {entry.org}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {entry.period}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="mt-1 text-base text-muted-foreground">
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
          </div>
        </Container>
      </section>
    </>
  );
}
