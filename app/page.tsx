import Link from "next/link";
import { Container } from "@/components/container";
import { StatusLabel, type Status } from "@/components/status-label";
import { ProfilePhoto } from "@/components/profile-photo";

type ExternalLink = { label: string; href: string };

type WorkItem = {
  title: string;
  period: string;
  summary: string;
  // Longer account, reserved for a future detail page — not rendered on this
  // list view yet (kept low-key here on purpose).
  detail: string;
  stack: string[];
  links: ExternalLink[];
};

const workItems: WorkItem[] = [
  {
    title: "미러링부스",
    period: "2025.11 — 2026.02",
    summary:
      "Apple 기기를 연결해 어디서나 나만의 포토부스를 만드는 앱이에요. 촬영 결과물 공유 기능과 초기 스트리밍 파이프라인을 담당했습니다.",
    detail:
      "4인 팀 프로젝트로 App Store에 배포했습니다. 팀 초기 각자 만든 스트리밍 프로토타입 중 FHD 환경에서 지연 없이 전송되고 구현 상태가 가장 안정적이라는 이유로 제 브랜치가 팀 베이스 코드로 채택됐습니다. 이후 촬영 결과물을 다른 기기로 공유하는 기능을 맡았고, 이 과정에서 발생한 문제 해결이 이 프로젝트에서 가장 깊이 다룬 작업이었습니다.",
    stack: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Multipeer Connectivity",
      "AVFoundation",
      "Swift Concurrency (AsyncStream)",
    ],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang",
      },
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
    ],
  },
  {
    title: "절약학개론",
    period: "2025.04 — 2025.06",
    summary:
      "학생 제휴 매장 정보를 지도 위에서 확인하는 앱이에요. 팀장을 맡아 TestFlight까지 배포했습니다.",
    detail:
      "4인 팀 프로젝트로 위치 기반 제휴 매장 정보를 제공했습니다. 매장 좌표 데이터가 없어 앱 내에서 실시간으로 지오코딩을 시도했으나 속도 저하와 오류가 반복됐습니다. API 응답을 직접 분석해 상호명 기반 검색의 정확도가 낮다는 것을 확인했고, 주소 기반 지오코딩과 백엔드 캐싱 구조로 전환했습니다.",
    stack: ["Swift", "UIKit", "Spring Boot"],
    links: [],
  },
  {
    title: "DrPill (약선생)",
    period: "2024.09 — 2024.12",
    summary:
      "약물 오남용 방지를 위한 개인 맞춤형 복약 관리 앱이에요. 캡스톤 팀장을 맡았습니다.",
    detail:
      "4인 팀 캡스톤 프로젝트로 캡스톤디자인 경진대회 대상을 받았습니다. 발표 자리에서 심사위원에게 서비스가 유사 처방 행위에 해당할 수 있다는 지적을 받았고, 개발 전 법적 검토가 없었다는 것을 인정했습니다. 이후 관련 내용을 직접 조사해 팀과 공유하고, 실사용 단계로 넘어가지 않고 프로젝트를 중단하기로 판단했습니다.",
    stack: ["React Native", "OpenCV", "Flask"],
    links: [],
  },
];

type Decision = {
  title: string;
  date: string;
  summary: string;
  // Longer account, reserved for a future detail page — not rendered on this
  // list view yet (kept low-key here on purpose).
  detail: string;
  status: Status;
  links: ExternalLink[];
};

// Discontinued/paused items are listed with the same visual weight as shipped
// ones; status is informational, not a judgment.
const decisions: Decision[] = [
  {
    title: "제안을 가려 받는 것도 판단입니다",
    date: "2026-02-04",
    status: "SHIPPED",
    summary:
      "클로저를 AsyncStream으로 옮기며 일부러 남긴 것이 있었고, 동료의 개선 제안도 근거를 따져 하나는 받고 하나는 거절했습니다.",
    detail:
      "이벤트 처리 방식을 클로저에서 AsyncStream으로 옮기던 중, 두 개의 콜백은 다른 컴포넌트와의 결합도가 높다는 이유로 이번 범위에서 의도적으로 제외했습니다. 이벤트 성격에 따라 버퍼 정책도 다르게 설계해, 놓치면 안 되는 이벤트는 무제한으로, 최신 상태만 중요한 하트비트는 최근 하나만 남기도록 했습니다. 리뷰에서 동료가 여러 화면에 흩어진 하트비트 처리 로직을 공통 컴포넌트로 뽑자고 제안했지만, 각 화면이 타임아웃 시 실제로 하는 일이 서로 달라 공통화하면 오히려 복잡도가 늘어난다고 판단해 받아들이지 않았습니다. 같은 프로젝트의 다른 PR에서는 동료 제안(공유 옵션을 컴포넌트 안에 캡슐화하자는 것)을 그 자리에서 수용한 적도 있어서, 제안을 무조건 따르거나 무조건 거절하는 게 아니라 매번 근거를 따져 판단했습니다.",
    links: [
      {
        label: "PR #287",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/287",
      },
    ],
  },
  {
    title: "포기하지 않는 트러블슈팅",
    date: "2026-01-27",
    status: "SHIPPED",
    summary:
      "렌더링 방식과 공유 방식을 번갈아 바꿔도 크래시가 그대로였고, 그 사실 자체가 원인이 코드 밖에 있다는 단서였습니다.",
    detail:
      "공유 기능에서 발생한 크래시를 렌더링 문제로 보고 ImageRenderer 교체, UIGraphicsImageRenderer 전환, 임시 파일 공유, CoreGraphics 직접 렌더링, PNG 무손실 변환, 재비트맵화까지 시도했지만 모두 동일한 크래시가 재현됐습니다. ShareLink를 포기하고 UIActivityViewController로 바꿔도 마찬가지였습니다. 렌더링과 공유 방식을 모두 바꿔도 실패했다는 사실 자체가, 원인이 이미지 처리 코드 안에 없다는 단서였습니다. AI에게 크래시 로그의 MTLDebugBuffer가 무엇인지 물어 이것이 실제 Metal 엔진이 아니라 Xcode의 디버그 전용 검증 레이어라는 설명을 얻었고, 이 정보를 근거로 옵션을 조정한 뒤 Debug·Release 양쪽과 커뮤니티 사례를 교차 확인해 운영 환경에는 영향이 없다는 결론에 도달했습니다.",
    links: [
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
    ],
  },
  {
    title: "AI에게 어디까지 맡기고, 어디부터 정의할 것인가요?",
    date: "2026-01",
    status: "IN PROGRESS",
    summary:
      "AI에게 전체 코드를 맡기자 맥락과 무관한 리뷰가 나왔고, 범위를 좁힌 뒤에도 남는 한계를 인정하고 역할을 나눴습니다.",
    detail:
      "PR이 하루 최대 12건까지 쌓이며 리뷰 부담이 커지자, AWS EC2에 n8n을 셀프호스팅해 PR 자동 리뷰 파이프라인을 설계했습니다. 처음에는 전체 코드를 매번 AI가 읽어들이도록 구성했으나 의도와 무관한 지적이 나왔습니다. 전체 맥락을 한 번에 다루려 한 접근 자체가 문제라고 보고, GitHub REST API로 PR의 변경사항만 추출해 그 범위 안에서 리뷰하도록 바꿨습니다. 다만 diff만으로는 프로젝트 전체 흐름을 AI가 파악할 수 없다는 한계도 확인했고, AI의 역할을 휴먼 에러·문법·지원 종료된 메서드처럼 명확히 판별 가능한 1차 검토로 한정했습니다. 맥락이 필요한 판단은 사람이 최종 결정하도록 기준을 세우고 이 근거를 문서로 남겼습니다.",
    links: [
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
    ],
  },
  {
    title: "만들고 나서가 아니라, 만들기 전에 확인한 3주",
    date: "2025-12-18",
    status: "DISCONTINUED",
    summary:
      "위치에 AR 콘텐츠를 고정하는 기능을 3주간 검증했고, 서비스 수준에서는 불가능하다고 결론 내려 만들기 전에 접었습니다.",
    detail:
      "ARKit·RealityKit과 Google ARCore Geospatial API를 결합해 현실의 특정 위치에 AR 콘텐츠를 저장하고 재실행 후에도 복원되는 기능을 검증했습니다. 저장 데이터를 최소화하는 데는 성공했지만, 시간 경과나 재실행에 따라 위치 추정이 흔들리며 앵커 위치가 크게 어긋나는 문제를 해결하지 못했습니다. 대안으로 검토한 두 방식(Cloud Anchor, 자체 앵커 점수제)도 각각 실내 한정과 서버 부하 문제로 제외됐습니다. 이 실패가 특정 구현 방식의 문제가 아니라 이 기술 자체가 국내에서 제한적으로 지원된다는 환경적 한계에서 비롯됐다고 판단해서, 3주간의 작업을 접고 기획 단계부터 다시 시작했습니다. DrPill을 만들고 난 뒤 문제를 알았던 것과 달리, 이번에는 만들기 전에 확인했습니다.",
    links: [],
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
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div className="min-w-[280px] max-w-[65ch] flex-1">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                윤대현 · YunDaeHyeon
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">iOS 개발자</p>
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
                {item.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
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
                {decision.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {decision.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
