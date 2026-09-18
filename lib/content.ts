import type { Status } from "@/components/status-label";

export type ExternalLink = { label: string; href: string };
export type DetailSection = { heading: string; items: string[] };

export type ProjectItem = {
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
export type ExperienceEntry = { org: string; period: string; note?: string };

export type About = {
  education: EducationEntry[];
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
  relatedProject?: string;
};

export const projectItems: ProjectItem[] = [
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
      "video-transfer-mode-tradeoff",
      "choosing-which-feedback-to-take",
      "relentless-troubleshooting",
      "browser-advertiser-encryption-mismatch",
      "fastlane-lane-misunderstanding",
      "browser-refactor-hybrid-decision",
      "defining-ai-review-scope",
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
    slug: "video-transfer-mode-tradeoff",
    title: "실시간성과 완전성, 같은 방식으로 보낼 수 없었습니다",
    date: "2026-02-25",
    status: "SHIPPED",
    summary:
      "비디오와 사진을 같은 방식으로 전송하지 않았습니다. 실시간 스트림은 손실을 감수하고, 완전한 결과물이 필요한 사진은 신뢰성을 우선했습니다.",
    sections: [
      {
        heading: "판단",
        items: [
          "비디오는 실시간성이 중요하고 일부 패킷 손실을 허용해도 된다고 보고 MultipeerConnectivity의 .unreliable 전송을 채택",
          "인코딩은 지연을 최소화하기 위해 H.264 Baseline Profile + VideoToolbox, B-frame 비활성화로 구성",
          "사진은 파일 크기가 크고 한 장이라도 완전해야 하므로 .unreliable 대신 sendResource로 분리",
        ],
      },
      {
        heading: "결론",
        items: ["데이터 성격에 따라 전송 방식과 인코딩 설정을 다르게 가져가는 것으로 역할을 분리해 확정"],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/프로토타입-기술-스택-및-구현-방식" }],
    relatedProject: "mirroring-booth",
  },
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
    relatedProject: "mirroring-booth",
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
    relatedProject: "mirroring-booth",
  },
  {
    slug: "browser-advertiser-encryption-mismatch",
    title: "설정이 아니라 놓친 코드 한 줄이었습니다",
    date: "2026-01-16",
    status: "SHIPPED",
    summary:
      "미러링·리모트 기기 간 세션 암호화 설정이 계속 어긋나는 문제를 겪었습니다. 설정값을 두 번 바꿔가며 실패한 뒤에야, 진짜 원인이 코드에서 빠뜨린 한 줄이었다는 걸 알았습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "remoteSession의 암호화를 .required에서 .none으로 바꿔 재연결 → 이유를 알 수 없는 암호화 오류 재발",
          "명령 세션을 하나 더 분리하는 2단계 구조로 변경 → 연결은 되지만 관리할 세션이 늘고 체감 지연도 커짐",
          "동료의 PR 피드백('remote session이 꼭 .required여야 했나요?')을 계기로 처음부터 다시 의심",
        ],
      },
      {
        heading: "판단",
        items: [
          "확신 없이 넘어가지 않기 위해 PR을 Draft로 돌리고, develop에서 별도 테스트 브랜치를 파서 원인을 격리해 재현하기로 결정",
          "테스트 브랜치에서 remoteSession을 다시 .none으로 되돌리고, Browser의 didReceive 핸들러에 remoteSession 분기가 빠져있었다는 것을 발견",
          "설정값이 아니라 수신 핸들러 코드 누락이 처음부터 진짜 원인이었음을 확인",
        ],
      },
    ],
    links: [
      {
        label: "PR #111",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/111",
      },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "fastlane-lane-misunderstanding",
    title: "우리가 Ad-hoc이라 불렀던 건 사실 개발용 배포였습니다",
    date: "2026-01-04",
    status: "IN PROGRESS",
    summary:
      "Fastlane으로 빌드부터 Appbox 업로드까지 자동화하다 프로비저닝 프로파일 오류를 만났습니다. 원인을 파고드니, 팀이 Ad-hoc이라 여겼던 배포 방식이 실은 개발용 배포였다는 걸 알게 됐습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "adhoc lane으로 빌드 시 프로비저닝 프로파일 오류 발생",
          "실제로는 Ad-hoc이 아니라 개발용(Development) 배포였다는 것을 확인하고 dev_ipa lane으로 전환",
          "Appbox 플러그인을 추가해 업로드와 설치 링크 추출까지 자동화",
        ],
      },
      {
        heading: "결론",
        items: [
          "`bundle exec fastlane dev_ipa` 한 줄로 빌드→업로드→설치 링크 추출까지 완료",
          "main 브랜치 push만으로 완전 자동배포하는 것은 다음 과제로 남김",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Fastlane으로-자동-배포-구현기" }],
  },
  {
    slug: "browser-refactor-hybrid-decision",
    title: "전부 통일하는 대신, 하나만 남겨뒀습니다",
    date: "2026-01-03",
    status: "SHIPPED",
    summary:
      "MultipeerConnectivity 기반 Browser의 콜백 구조를 AsyncStream으로 리팩터링했습니다. 다중 구독이 필요한 이벤트 하나는 통일성보다 안전한 리팩터링을 우선해 의도적으로 남겨뒀습니다.",
    sections: [
      {
        heading: "판단",
        items: [
          "프로토콜 추출을 통한 완전한 테스트 가능 구조도 검토했지만, 이번 범위에는 과한 대규모 리팩터링이라 보류",
          "대부분의 콜백은 AsyncStream(BrowserEvents enum)으로 점진 이전",
          "다중 구독이 필요한 onStartTransferCommand 하나는 Combine을 그대로 유지",
        ],
      },
      {
        heading: "근거",
        items: [
          "이벤트 손실이 있으면 안 된다는 이유로 버퍼 정책을 기본값 unbounded로 설정",
          "'통일성'보다 '코드 중복 방지와 안전한 리팩터링'을 우선한 절충",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Browser-리팩터링-일지" }],
    relatedProject: "mirroring-booth",
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
    relatedProject: "mirroring-booth",
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
  experience: [
    {
      org: "KB-Bridge AI 활용 데이터분석 과정",
      period: "2026.08 — 진행중",
    },
    {
      org: "네이버 부스트캠프 웹·모바일 10기 (iOS)",
      period: "2025.06 — 2026.02",
      note: "8개월 풀타임으로 참여했고, 미러링부스 그룹 프로젝트를 진행했습니다.",
    },
    {
      org: "카카오엔터프라이즈X구름 군장병 AI·SW 역량강화과정",
      period: "2023.03 — 2023.06",
      note: "수료",
    },
  ],
  certifications: [
    "정보처리기사",
    "SQLD",
    "리눅스마스터 2급",
    "프로그래밍기능사",
  ],
  awards: [
    "공학교육원 캡스톤디자인 경진대회 대상 (2024)",
    "대학일자리플러스센터 기업분석 면접경진대회 대상 (2025)",
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
