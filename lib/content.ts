import type { Status } from "@/components/status-label";

export type ExternalLink = { label: string; href: string };
export type DetailSection = { heading: string; items: string[] };

export type WorkItem = {
  slug: string;
  title: string;
  icon?: string;
  period: string;
  summary: string;
  stack: string[];
  sections: DetailSection[];
  /** A single, prominent piece of evidence (e.g. a live App Store listing) —
   *  rendered as a small pill next to the title, separate from the plain
   *  reference links in `links`. */
  badge?: ExternalLink;
  links: ExternalLink[];
  relatedDecisions?: string[];
};

export type EducationEntry = { school: string; major: string; period: string };
export type CareerEntry = { org: string; role: string; period: string };
export type ExperienceEntry = { org: string; period: string; note?: string };

export type About = {
  education: EducationEntry[];
  career: CareerEntry[];
  experience: ExperienceEntry[];
  certifications: string[];
  awards: string[];
  mentoring: string[];
  contact: ExternalLink[];
};

export type Decision = {
  slug: string;
  title: string;
  date: string;
  status: Status;
  summary: string;
  sections: DetailSection[];
  links: ExternalLink[];
  relatedWork?: string;
};

export const workItems: WorkItem[] = [
  {
    slug: "mirroring-booth",
    title: "미러링부스",
    icon: "/icons/mirroring-booth.png",
    period: "2025.11 — 2026.02",
    summary:
      "Apple 기기 여러 대를 연결해 포토부스를 만드는 앱입니다. 촬영 결과 공유 기능과 초기 스트리밍 구조를 맡았습니다.",
    stack: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Multipeer Connectivity",
      "AVFoundation",
      "Swift Concurrency (AsyncStream)",
    ],
    sections: [
      {
        heading: "팀 구성",
        items: ["4인 팀 프로젝트", "App Store 배포까지 진행"],
      },
      {
        heading: "담당한 기능",
        items: [
          "초기 스트리밍 프로토타입 구현 — FHD 환경에서 지연 없이 전송되는 안정적인 구현으로 팀 베이스 코드로 채택됨",
          "촬영 결과물을 다른 기기로 공유하는 기능 구현",
          "이벤트 처리 구조를 클로저에서 AsyncStream 기반으로 전환",
          "PR 자동 리뷰 파이프라인 설계 (n8n + GitHub REST API)",
        ],
      },
    ],
    badge: {
      label: "App Store",
      href: "https://apps.apple.com/kr/app/%EB%AF%B8%EB%9F%AC%EB%A7%81%EB%B6%80%EC%8A%A4/id6758043558",
    },
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang",
      },
    ],
    relatedDecisions: [
      "relentless-troubleshooting",
      "defining-ai-review-scope",
      "choosing-which-feedback-to-take",
    ],
  },
  {
    slug: "student-deals-map",
    title: "절약학개론",
    icon: "/icons/student-deals-map.png",
    period: "2025.04 — 2025.06",
    summary:
      "학생 할인 매장을 지도에서 찾아볼 수 있는 앱입니다. 팀장을 맡았고 TestFlight까지 배포했습니다.",
    stack: ["Swift", "UIKit", "NMapsMap", "Firebase"],
    sections: [
      {
        heading: "팀 구성",
        items: [
          "4인 팀 프로젝트 (팀장)",
          "TestFlight 배포까지 진행",
          "팀원이 담당한 백엔드 구현에 조언을 주기도 했습니다.",
        ],
      },
      {
        heading: "담당한 기능",
        items: [
          "위치 기반 제휴 매장 정보 제공 기능",
          "실시간 지오코딩 방식의 속도 저하·오류 문제를 직접 진단",
          "API 응답 분석으로 상호명 기반 검색의 낮은 정확도를 확인",
          "주소 기반 지오코딩 + 백엔드 캐싱 구조로 전환",
        ],
      },
    ],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/CampusCrew/Jeolhak-ios",
      },
    ],
  },
  {
    slug: "drpill",
    title: "DrPill (약선생)",
    icon: "/icons/drpill.png",
    period: "2024.09 — 2024.12",
    summary:
      "약물 오남용을 줄이기 위한 복약 관리 앱입니다. 캡스톤 프로젝트 팀장을 맡았습니다.",
    stack: ["React Native", "NestJS", "OpenCV"],
    sections: [
      {
        heading: "팀 구성",
        items: ["4인 팀 캡스톤 프로젝트 (팀장)", "캡스톤디자인 경진대회 대상 수상"],
      },
      {
        heading: "중단 배경",
        items: [
          "발표 심사위원으로부터 서비스가 유사 처방 행위에 해당할 수 있다는 지적을 받음",
          "개발 전 법적 검토가 없었음을 인정",
          "관련 내용을 직접 조사해 팀과 공유",
          "실사용 단계로 넘어가지 않고 프로젝트 중단을 판단",
        ],
      },
    ],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/YunDaeHyeon/DrPill",
      },
    ],
  },
];

export const decisions: Decision[] = [
  {
    slug: "choosing-which-feedback-to-take",
    title: "제안을 가려 받는 것도 판단입니다",
    date: "2026-02-04",
    status: "SHIPPED",
    summary:
      "클로저를 AsyncStream으로 옮겼습니다. 동료가 준 개선 제안은 근거를 따져 하나는 받아들이고, 하나는 그대로 뒀습니다.",
    sections: [
      {
        heading: "배경",
        items: ["이벤트 처리 방식을 클로저에서 AsyncStream으로 전환하는 작업"],
      },
      {
        heading: "판단",
        items: [
          "두 개의 콜백은 다른 컴포넌트와의 결합도가 높아 이번 범위에서 의도적으로 제외",
          "이벤트 성격별로 버퍼 정책을 다르게 설계 (놓치면 안 되는 이벤트는 무제한, 하트비트는 최신 1개만 유지)",
          "동료의 '하트비트 처리 로직 공통화' 제안은 화면별로 실제 동작이 달라 복잡도만 늘어난다고 판단해 거절",
          "같은 프로젝트의 다른 PR에서는 동료 제안(공유 옵션 캡슐화)을 그 자리에서 수용",
        ],
      },
      {
        heading: "결론",
        items: ["제안은 무조건 따르거나 거절하지 않고, 매번 근거를 따져 판단"],
      },
    ],
    links: [
      {
        label: "PR #287",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/287",
      },
    ],
    relatedWork: "mirroring-booth",
  },
  {
    slug: "relentless-troubleshooting",
    title: "바꿔도 사라지지 않은 크래시",
    date: "2026-01-27",
    status: "SHIPPED",
    summary:
      "렌더링 방식도, 공유 방식도 바꿔봤지만 크래시는 그대로였습니다. 그래서 원인이 코드 밖에 있을 수 있다고 봤습니다.",
    sections: [
      {
        heading: "시도한 것",
        items: [
          "ImageRenderer 교체",
          "UIGraphicsImageRenderer 전환",
          "임시 파일 공유 방식",
          "CoreGraphics 직접 렌더링",
          "PNG 무손실 변환",
          "재비트맵화",
          "ShareLink → UIActivityViewController 전환",
          "(모두 동일한 크래시가 재현됨)",
        ],
      },
      {
        heading: "판단과 발견",
        items: [
          "렌더링·공유 방식을 모두 바꿔도 실패 → 원인이 이미지 처리 코드 밖에 있다는 단서로 해석",
          "AI에게 크래시 로그의 MTLDebugBuffer를 질의 → Metal 엔진이 아닌 Xcode 디버그 전용 검증 레이어임을 확인",
          "Debug·Release 양쪽과 커뮤니티 사례를 교차 확인해 운영 환경에는 영향 없다는 결론 도출",
        ],
      },
    ],
    links: [
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
    ],
    relatedWork: "mirroring-booth",
  },
  {
    slug: "defining-ai-review-scope",
    title: "AI에게 어디까지 맡기고, 어디부터 정의할 것인가요?",
    date: "2026-01",
    status: "IN PROGRESS",
    summary:
      "AI에게 전체 코드를 보여줬더니 지금 변경과 상관없는 리뷰가 나왔습니다. PR의 변경사항만 전달하도록 범위를 좁혔고, 그래도 남는 부분은 사람이 판단하기로 했습니다.",
    sections: [
      {
        heading: "배경",
        items: ["PR이 하루 최대 12건까지 쌓이며 리뷰 부담이 커짐"],
      },
      {
        heading: "시도",
        items: [
          "AWS EC2에 n8n을 셀프호스팅해 PR 자동 리뷰 파이프라인을 설계",
          "1차: 전체 코드를 매번 AI가 읽어들이도록 구성 → 의도와 무관한 지적이 발생",
          "2차: GitHub REST API로 PR의 변경사항(diff)만 추출해 그 범위 안에서 리뷰하도록 변경",
        ],
      },
      {
        heading: "한계 인정과 역할 정의",
        items: [
          "diff만으로는 프로젝트 전체 흐름을 AI가 파악할 수 없다는 한계를 확인",
          "AI의 역할을 휴먼 에러·문법·지원 종료된 메서드처럼 명확히 판별 가능한 1차 검토로 한정",
          "맥락이 필요한 판단은 사람이 최종 결정하도록 기준을 세우고 문서로 남김",
        ],
      },
    ],
    links: [
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
    ],
    relatedWork: "mirroring-booth",
  },
  {
    slug: "ar-anchor-validation",
    title: "만들고 나서가 아니라, 만들기 전에 확인한 3주",
    date: "2025-12-18",
    status: "DISCONTINUED",
    summary:
      "위치에 AR 콘텐츠를 고정하는 기능을 3주 동안 검증했습니다. 기술적으로 되는 것과 서비스에 필요한 수준 사이 차이가 컸고, 더 만들기 전에 중단했습니다.",
    sections: [
      {
        heading: "검증한 것",
        items: [
          "ARKit·RealityKit + Google ARCore Geospatial API로 특정 위치에 AR 콘텐츠를 저장하고, 재실행 후에도 복원되는 기능",
        ],
      },
      {
        heading: "성과와 한계",
        items: [
          "저장 데이터를 최소화하는 데는 성공",
          "시간 경과·재실행에 따라 위치 추정이 흔들려 앵커 위치가 크게 어긋나는 문제는 해결하지 못함",
          "대안 1: Cloud Anchor — 실내 환경 한정이라는 문제로 제외",
          "대안 2: 자체 앵커 점수제 — 서버 부하 문제로 제외",
        ],
      },
      {
        heading: "결론",
        items: [
          "특정 구현 방식의 문제가 아니라 이 기술 자체가 국내에서 제한적으로 지원된다는 환경적 한계로 판단",
          "3주 만에 접고 기획 단계부터 다시 시작",
        ],
      },
    ],
    links: [],
  },
];

export const about: About = {
  education: [
    {
      school: "원광대학교",
      major: "컴퓨터소프트웨어공학과",
      period: "2020.03 — 2026.02",
    },
  ],
  career: [
    {
      org: "(주)엔진이엔티",
      role: "STT 품질검수 프리랜서",
      period: "2021.08 — 2021.12",
    },
  ],
  experience: [
    {
      org: "KB-Bridge AI 활용 데이터분석 과정",
      period: "2026.08 — 진행중",
    },
    {
      org: "전북신용보증재단 일경험",
      period: "2026.04 — 2026.07",
      note: "보증드림 앱 사용법 안내, 엑셀 매크로를 이용한 보증서류 처리 자동화",
    },
    {
      org: "네이버 부스트캠프 웹·모바일 10기 (iOS)",
      period: "2025.06 — 2026.02",
      note: "8개월 풀타임으로 참여했고, 미러링부스 그룹 프로젝트를 진행했습니다.",
    },
    {
      org: "카카오엔터프라이즈X구름 군장병 AI·SW 역량강화과정",
      period: "2023",
      note: "수료",
    },
  ],
  certifications: [
    "정보처리기사",
    "SQLD",
    "리눅스마스터 2급",
    "정보처리기능사",
  ],
  awards: [
    "캡스톤디자인 경진대회 대상 (2024)",
    "기업분석·면접경진대회 대상 (2025, 단독 참가)",
  ],
  mentoring: [
    "소프트웨어중심대학 SW길잡이 멘토단",
    "소프트웨어중심대학 SW멘토-멘티",
  ],
  contact: [
    { label: "이메일", href: "mailto:daehyeon.ydh@gmail.com" },
    { label: "GitHub", href: "https://github.com/YunDaeHyeon" },
    { label: "Velog", href: "https://velog.io/@dxxh_e" },
  ],
};
