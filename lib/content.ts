import type { Status } from "@/components/status-label";

export type ExternalLink = { label: string; href: string };
export type Media = { src: string; width: number; height: number; alt: string };
export type DetailSection = { heading: string; items: string[] };

export type ProjectItem = {
  slug: string;
  title: string;
  icon?: string;
  period: string;
  /** 팀 규모와 맡은 역할. 기간 옆에 함께 표시된다. */
  role?: string;
  summary: string;
  stack: string[];
  sections: DetailSection[];
  /** A single, prominent piece of evidence (e.g. a live App Store listing) —
   *  rendered as a small pill next to the title, separate from the plain
   *  reference links in `links`. */
  badge?: ExternalLink;
  /** Representative image shown at the top of the detail view. */
  thumbnail?: Media;
  /** Screenshots shown as a horizontally scrolling strip in the detail view. */
  screenshots?: Media[];
  links: ExternalLink[];
  relatedDecisions?: string[];
};

export type EducationEntry = { school: string; major: string; period: string; note?: string };
export type ExperienceEntry = { org: string; period: string; note?: string };

export type SkillEntry = { name: string; items: string[] };
export type SkillGroup = { heading: string; entries: SkillEntry[] };

export type About = {
  skills: SkillGroup[];
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
    role: "4인 팀 · iOS",
    summary: "포토부스를 찾아갈 필요 없이, Apple 기기로 시작하는 나만의 포토부스",
    stack: [
      "Swift",
      "SwiftUI",
      "Multipeer Connectivity",
      "WatchConnectivity",
      "AVFoundation",
      "VideoToolbox",
      "Swift Concurrency",
      "GitHub Actions",
      "Fastlane",
      "n8n",
    ],
    thumbnail: {
      src: "/projects/mirroring-booth/thumb-devices.webp",
      width: 1600,
      height: 900,
      alt: "미러링부스를 Mac, iPad, iPhone, Apple Watch에서 사용하는 모습",
    },
    screenshots: [
      { src: "/projects/mirroring-booth/shot-1.webp", width: 560, height: 1215, alt: "가진 기기를 자유롭게 조합" },
      { src: "/projects/mirroring-booth/shot-2.webp", width: 560, height: 1215, alt: "후면 카메라 화질 그대로 실시간 촬영" },
      { src: "/projects/mirroring-booth/shot-3.webp", width: 560, height: 1215, alt: "타이머 또는 리모트 촬영 방식 선택" },
      { src: "/projects/mirroring-booth/shot-4.webp", width: 560, height: 1215, alt: "포즈 추천" },
      { src: "/projects/mirroring-booth/shot-5.webp", width: 560, height: 1215, alt: "프레임 스타일 선택" },
      { src: "/projects/mirroring-booth/shot-6.webp", width: 560, height: 1215, alt: "저장과 공유" },
    ],
    sections: [
      {
        heading: "문제 의식",
        items: [
          "후면 카메라는 화질이 좋지만 셀카를 찍을 땐 내 모습이 보이지 않아, 결국 화질이 낮은 전면 카메라를 쓰게 됩니다.",
          "Apple Watch 리모컨은 화면이 작아 구도를 잡기 어렵고, 셔터를 누를 때 시선이 분산됩니다.",
        ],
      },
      {
        heading: "해결",
        items: [
          "iPhone 후면 카메라 화면을 iPad·Mac 같은 다른 Apple 기기에 실시간으로 미러링해, 큰 화면으로 포즈를 확인하며 촬영하게 했습니다.",
          "타이머·리모트 촬영을 지원하고, 촬영한 사진을 프레임에 합성해 저장하고 공유할 수 있습니다.",
        ],
      },
      {
        heading: "담당한 기능 · 기획 검증",
        items: [
          "AR로 특정 위치에 콘텐츠를 고정하는 초기 기획을 3주 동안 검증했고, 서비스에 필요한 수준의 정확도를 확보할 수 없다고 판단해 팀과 함께 기획 전환에 합의했습니다. (2025.12)",
        ],
      },
      {
        heading: "담당한 기능 · iOS",
        items: [
          "후면 카메라 영상을 H.264로 하드웨어 인코딩해 iPad·Mac으로 실시간 전송하는 스트리밍 모듈을 구현했습니다.",
          "촬영 결과물을 다른 기기로 공유하는 기능을 구현했습니다.",
          "이벤트 처리 구조를 클로저 콜백에서 AsyncStream 기반으로 리팩터링했습니다.",
          "앱 UI를 구축했습니다.",
        ],
      },
      {
        heading: "담당한 기능 · CI/CD",
        items: [
          "Fastlane으로 내부 테스터 배포를 자동화했습니다. 명령 한 줄로 Development IPA 빌드부터 AppBox 업로드, 설치 링크 전송까지 처리합니다.",
          "공식 배포용 레인도 만들어 App Store 배포용 IPA 빌드와 TestFlight 업로드를 자동화했습니다.",
          "n8n과 GitHub REST API로 PR 리뷰를 자동화했습니다.",
        ],
      },
      {
        heading: "담당한 기능 · 문서화",
        items: ["프로젝트 전반의 문서화를 맡았습니다."],
      },
      {
        heading: "성과",
        items: [
          "App Store에 출시했습니다.",
          "외부 테스트에서 25명이 다양한 환경으로 설치했으며, 크래시 리포트는 0건이었습니다.",
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
      {
        label: "Wiki",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki",
      },
      {
        label: "App Store 심사 대응 기록",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki/App-Store-%EC%8B%AC%EC%82%AC-%EB%8C%80%EC%9D%91-%EA%B8%B0%EB%A1%9D",
      },
      {
        label: "사용자 피드백 대응",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki/%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%BC%EB%93%9C%EB%B0%B1-%EB%8C%80%EC%9D%91",
      },
    ],
    relatedDecisions: [
      "ar-anchor-validation",
      "app-store-review-reframing",
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
    period: "2025.03 — 2025.06",
    role: "4인 팀 · 팀장 · iOS · 백엔드",
    summary: "대학생을 위한 위치 기반 지역 대학가 할인 정보 제공 플랫폼",
    stack: [
      "Swift",
      "UIKit",
      "SnapKit",
      "Naver Maps",
      "APNs · FCM",
      "Spring Boot",
      "MySQL",
      "AWS EC2",
    ],
    thumbnail: {
      src: "/projects/student-deals-map/thumb.webp",
      width: 1200,
      height: 675,
      alt: "절약학개론 소개 배너",
    },
    screenshots: [
      { src: "/projects/student-deals-map/shot-1.webp", width: 432, height: 862, alt: "지도에서 할인 매장 탐색" },
      { src: "/projects/student-deals-map/shot-2.webp", width: 432, height: 862, alt: "마커 선택 시 매장 카드" },
      { src: "/projects/student-deals-map/shot-3.webp", width: 432, height: 862, alt: "주변 매장 목록" },
      { src: "/projects/student-deals-map/shot-4.webp", width: 432, height: 862, alt: "할인 상세" },
      { src: "/projects/student-deals-map/shot-5.webp", width: 432, height: 862, alt: "지도에서 위치를 골라 매장 등록" },
    ],
    sections: [
      {
        heading: "문제 의식",
        items: [
          "대학가에는 학생 할인이 많지만 SNS, 입소문, 전단지에 흩어져 있어 학생이 한눈에 확인하기 어렵습니다.",
          "기존 할인 앱은 프랜차이즈 중심이라 대학가 소규모 매장의 할인 정보를 담지 못했습니다.",
        ],
      },
      {
        heading: "해결",
        items: [
          "네이버 지도 위에 제휴 매장을 마커로 보여주고, 단과대·학과 기준으로 필터링할 수 있게 했습니다.",
          "학생이 직접 할인 매장을 등록할 수 있고, 새 매장이 등록되면 푸시 알림으로 알려줍니다.",
          "원광대학교 인근 상권에서 실기기로 테스트했습니다.",
        ],
      },
      {
        heading: "담당한 기능 · iOS",
        items: [
          "APNs 푸시 알림 시스템을 구축했습니다.",
          "제휴 매장 정보를 제공하는 기능을 구현했습니다.",
        ],
      },
      {
        heading: "담당한 기능 · 백엔드",
        items: [
          "Spring Boot로 매장·할인 정보를 제공하는 API 서버를 직접 구현하고 AWS EC2에 배포했습니다.",
          "MySQL로 매장 데이터를 모델링하고, JPA Native Query로 반경 300m 이내 매장을 검색하도록 했습니다.",
          "지오코딩 시스템을 구축했습니다.",
          "매번 요청하던 네이버 API의 썸네일을 image_url에 캐싱하여 사용하고, 데이터가 없는 경우에만 외부 API를 호출하도록 개선했습니다.",
        ],
      },
      {
        heading: "담당한 기능 · 팀 리딩",
        items: [
          "이슈를 '문제 현상 - 원인 추적 - 해결책' 3단계 양식으로 표준화해, 프론트엔드와 백엔드 사이에서 반복되던 소통 오류를 줄였습니다.",
          "구현에 들어가기 전에 스펙과 API 구조를 파트끼리 함께 검토하는 절차를 마련했습니다.",
          "Spring Boot를 처음 접한 팀원이 흐름을 잡을 수 있도록 Controller · Service · Repository로 계층 책임을 나눠, 작업 범위가 겹치지 않고 병렬로 진행되게 했습니다.",
        ],
      },
      {
        heading: "성과",
        items: [
          "제휴 매장 50개를 조회할 때 발생하던 이미지 API 호출을 50회에서 9회로 줄였습니다. (82% 감소, 평균 응답 속도 35% 개선)",
          "TestFlight로 배포해 초기 테스터 약 10명과 계획대로 테스트를 진행했고, '맞춤형 정보 필터링'에서 긍정적인 피드백을 받았습니다.",
        ],
      },
    ],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/CampusCrew/Jeolhak-ios",
      },
      {
        label: "Wiki",
        href: "https://github.com/CampusCrew/Jeolhak-ios/wiki",
      },
      {
        label: "트러블슈팅 기록",
        href: "https://github.com/CampusCrew/Jeolhak-ios/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EC%A0%95%EB%A6%AC",
      },
      {
        label: "시연 영상",
        href: "https://drive.google.com/drive/folders/1FFyjuyi4RfuE5bqI1uN_Gfv-uP1HG-TX?usp=sharing",
      },
      // TODO(확인필요: 백엔드 저장소 URL. 직접 구현했다고 적었으므로 코드 근거 링크가 필요하다)
    ],
    relatedDecisions: ["store-image-api-caching"],
  },
  {
    slug: "drpill",
    title: "DrPill (약선생)",
    icon: "/icons/drpill.png",
    period: "2024.09 — 2024.11",
    role: "4인 팀 · 팀장 · 풀스택",
    summary: "약물 오남용 방지 및 안전한 약 복용을 위한 개인 의약품 맞춤 서비스",
    stack: ["React Native", "NestJS", "MySQL", "Flask", "OpenCV", "Roboflow", "AWS EC2"],
    thumbnail: {
      src: "/projects/drpill/thumb-store.webp",
      width: 1600,
      height: 900,
      alt: "약선생 앱의 알약 인식 결과, 시작, 로그인, 약품 종류 화면",
    },
    sections: [
      {
        heading: "문제 의식",
        items: [
          "약물 복용량이 늘고 약물 상호작용이 복잡해지면서, 잘못 복용하거나 남용하는 문제가 생깁니다.",
        ],
      },
      {
        heading: "해결",
        items: [
          "카메라로 알약을 찍으면 가장 비슷한 의약품을 최대 4개까지 찾아줍니다.",
          "관심 질환에 맞춘 의약품 리스트와 검색, 즐겨찾기, 정보 요약과 음성 안내를 제공합니다.",
        ],
      },
      {
        heading: "담당한 기능",
        items: [
          "알약 데이터셋 전처리를 진행했습니다.",
          "Roboflow 기반으로 알약 이미지 분류·감지 시스템을 구축했습니다.",
          "일반·전문의약품 리스트와 검색 기능을 구현했습니다.",
          "의약품 즐겨찾기 기능을 구현했습니다.",
          "의약품 정보를 요약하고 음성 데이터로 제공하는 기능을 구현했습니다.",
        ],
      },
      {
        heading: "성과",
        items: [
          "2024 공학교육원 캡스톤디자인 경진대회 대상",
          "2024 컴공인의날 최우수상",
          "2024 소프트웨어 아이디어 경진대회 우수상",
        ],
      },
    ],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/YunDaeHyeon/DrPill",
      },
      {
        label: "시연 영상",
        href: "https://drive.google.com/file/d/1jL2s_DuCjwJEPm3Y-DkzjX0lqVQCDgpo/view?usp=sharing",
      },
    ],
  },
];

export const decisions: Decision[] = [
  {
    slug: "store-image-api-caching",
    title: "지오코딩·이미지 API 캐싱 트러블슈팅",
    date: "2025.05",
    status: "SHIPPED",
    summary:
      "반복적인 외부 API 호출로 인한 매장 목록 지연을 DB 캐싱으로 개선했습니다.",
    sections: [
      {
        heading: "문제",
        items: [
          "매장 데이터에는 상호명과 주소만 있고 좌표가 없어, 앱이 실행 중에 주소를 좌표로 바꾸면서 지연이 발생",
          "매장에 대표 썸네일이 없어 네이버 검색 API로 매번 조회했고, 제휴 매장 50개를 볼 때 호출이 50번 발생",
        ],
      },
      {
        heading: "기준과 판단",
        items: [
          "역지오코딩과 반경 기반 필터링도 검토했지만, 어느 쪽이든 매장별 좌표가 먼저 있어야 한다는 점은 그대로여서 근본 해결이 아니라고 판단",
          "좌표와 이미지 URL 모두 매장마다 거의 바뀌지 않는 값이므로, 매번 조회할 대상이 아니라 한 번 받아 저장할 대상으로 정의",
          "확보한 매장 약 100곳의 좌표는 한 번만 전처리하고, 사용자가 매장을 등록·수정할 때만 즉시 변환",
          "이미지는 image_url 컬럼에 저장해 재사용하고, 값이 없을 때만 API를 호출",
        ],
      },
      {
        heading: "트레이드오프",
        items: [
          "저장한 값이 원본과 어긋날 수 있다는 점을 감수하는 대신, 조회 경로에서 외부 API 의존을 걷어내는 쪽을 선택",
          "image_url을 nullable로 두고 기본 이미지로 대체해, 이미지가 없는 매장 때문에 목록 전체가 막히지 않게 함",
          "좌표 변환 비용을 조회 시점에서 등록 시점으로 옮겨, 자주 일어나는 작업 대신 드물게 일어나는 작업이 비용을 지게 함",
        ],
      },
      {
        heading: "결과",
        items: [
          "매장 50개 조회 시 이미지 API 호출이 50회에서 9회로 감소 (82%)",
          "평균 응답 속도 35% 개선",
          // TODO(확인필요: 개선 전후 응답 시간(ms)과 어떻게 측정했는지. 현재 값은 비율만 있고 측정 방법이 없다)
        ],
      },
    ],
    links: [
      {
        label: "트러블슈팅 기록",
        href: "https://github.com/CampusCrew/Jeolhak-ios/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85-%EC%A0%95%EB%A6%AC",
      },
    ],
    relatedProject: "student-deals-map",
  },
  {
    slug: "app-store-review-reframing",
    title: "App Store 심사 대응 기록",
    date: "2026.02.06",
    status: "SHIPPED",
    summary:
      "반복된 심사 반려 원인을 사용자 관점의 UX 문제로 재정의하여 App Store 최종 승인을 받았습니다.",
    sections: [
      {
        heading: "반려 사유",
        items: [
          "1차 (2026.01.31): Apple Watch 앱 아이콘 배경이 검정이라 원형으로 보이지 않음, Watch를 탭해도 미러링이 시작되지 않음",
          "2차 (2026.02.04): Watch 화면이 '연결 대기 중'으로 표시되지만 미러링 기기 목록에 나타나지 않음",
          "3차 (2026.02.05): 소명 후 최종 반려. Watch를 리모트로 연결할 때 '연결 대기 중'이 무한 로딩",
        ],
      },
      {
        heading: "판단",
        items: [
          "2차까지는 '미러링 기기로서의 Watch 연결' 문제로 이해하고 소명했지만, 실제 지적은 '리모트 컨트롤러로서의 연결' 문제였음을 3차에서 확인",
          "Watch는 리모트 전용이라는 팀의 전제는 사용자에게 드러나 있지 않았고, 목록에 보이는데 연결되지 않는 상태는 사용자 입장에서 버그로 읽힌다고 판단",
          "심사 문구에 맞춘 수정이 아니라 '리모트 연결 상태와 타임아웃을 어떻게 드러낼 것인가'로 문제를 다시 정의",
        ],
      },
      {
        heading: "결과",
        items: [
          "WatchConnectivity 연결 흐름과 '연결 대기 중' 상태의 타임아웃·에러 처리를 보완",
          "4차 심사에서 승인, 2026.02.06 App Store 배포",
        ],
      },
    ],
    links: [
      {
        label: "App Store 심사 대응 기록",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki/App-Store-%EC%8B%AC%EC%82%AC-%EB%8C%80%EC%9D%91-%EA%B8%B0%EB%A1%9D",
      },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "video-transfer-mode-tradeoff",
    title: "프로토타입 기술 스택 및 구현 방식",
    // 프로토타입 단계의 판단이다. 프로토타입 병합 PR #27이 2026.01.06에 머지됐다.
    date: "2026.01",
    status: "SHIPPED",
    summary:
      "데이터 특성에 맞춰 전송 프로토콜과 인코딩 전략을 분리해 실시간성과 신뢰성을 확보했습니다.",
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
        items: [
          "데이터 성격에 따라 전송 방식과 인코딩 설정을 다르게 가져가는 것으로 역할을 분리해 확정",
          "프로토타입 단계에서 4인이 각자 검증한 내용을 모아 기본 구조를 잡는 PR로 병합 (PR #27)",
          // TODO(확인필요: 이력서에는 이 모듈이 '팀 베이스 코드로 채택'이라고 적혀 있다.
          //   PR #27은 4인 짝 프로그래밍 결과를 함께 병합한 PR이라 그 문장을 그대로 뒷받침하지는 못한다.
          //   어느 구현이 베이스로 남았는지 확인되면 문장을 보강할 것)
        ],
      },
    ],
    links: [
      { label: "전체 기록", href: "/lab/프로토타입-기술-스택-및-구현-방식" },
      {
        label: "PR #27 (프로토타입 병합)",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/27",
      },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "choosing-which-feedback-to-take",
    title: "Browser 콜백 AsyncStream 전환 (PR #287)",
    date: "2026.02.04",
    status: "SHIPPED",
    summary:
      "클로저를 AsyncStream으로 옮겼습니다. 동료가 준 개선 제안은 근거를 따져 하나는 받아들이고, 하나는 그대로 뒀습니다.",
    sections: [
      {
        heading: "배경",
        items: [
          "Browser의 이벤트 처리 방식을 클로저에서 AsyncStream으로 옮기는 후속 작업 (PR #287)",
        ],
      },
      {
        heading: "판단",
        items: [
          "콜백 8개를 AsyncStream으로 옮기고, 다른 컴포넌트와 결합도가 높은 onRemoteModeCommand·onSelectedTimerModeCommand 두 개는 이번 PR 범위에서 의도적으로 제외",
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
    title: "공유 기능 구현 시 발생한 문제 정리",
    date: "2026.01.27",
    status: "SHIPPED",
    summary:
      "지속적인 크래시 원인을 추적해 렌더링 로직이 아닌 Xcode 디버그 옵션과 Metal 검증 레이어 간 충돌임을 규명했습니다.",
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
          "렌더링 경로와 공유 경로를 모두 바꿔도 같은 크래시가 재현됨 → 원인이 이미지 처리 코드 밖에 있다는 단서로 해석",
          "크래시 로그의 MTLDebugBuffer를 조사해, Metal 엔진에 실제로 존재하는 객체가 아니라 Metal API Validation을 켰을 때만 끼어드는 Xcode 디버그 전용 검증 래퍼임을 확인",
          "즉 이미지 자체가 잘못된 것이 아니라, 검증 레이어가 만든 텍스처와 실제 버퍼의 resourceOptions가 어긋나 assertion이 걸리는 상황으로 정리",
        ],
      },
      {
        heading: "확인한 것",
        items: [
          "검증 옵션을 끈 상태에서 Debug와 Release 양쪽 모두 크래시가 재현되지 않는 것을 확인",
          "같은 증상을 겪은 외부 사례들과 대조해, 디버그 전용 옵션이라는 해석이 맞는지 교차 확인",
          "TestFlight 외부 테스트에서 테스터 25명이 설치한 기간 동안 크래시 리포트 0건",
          // TODO(확인필요: Lab 원문의 '시도 요약'은 6가지로 적혀 있고 본문은 5-1~5-9까지 이어진다.
          //   이력서·이 기록은 7가지 기준이므로, Lab 원문의 요약 목록을 7가지로 맞출지 결정 필요)
        ],
      },
      {
        heading: "남긴 것",
        items: [
          "옵션을 끈 뒤에도 남는 AlphaPremulLast 경고는 별개 문제로 보고, 렌더링 포맷에서 알파 채널을 제거해 따로 해결",
        ],
      },
    ],
    links: [
      {
        label: "PR #220",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/220",
      },
      { label: "전체 기록", href: "/lab/공유-기능-구현-시-발생한-문제-정리" },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "browser-advertiser-encryption-mismatch",
    title: "Browser·Advertiser 암호화 불일치 해결",
    date: "2026.01.19",
    status: "SHIPPED",
    summary:
      "실험 대상을 재검증해 세션 간 암호화 설정 어긋남을 파악하고, 구조 추가 없이 연결 실패를 해결했습니다.",
    sections: [
      {
        heading: "증상",
        items: [
          "리모트 기기 연결 시 `incompatible encryption preference` 경고와 함께 연결 실패",
          "Browser는 `.required`인 remoteSession으로 명령을 보내는데, Advertiser는 `.none`인 commandSession으로 받고 있어 설정이 어긋난 상태",
        ],
      },
      {
        heading: "잘못 내린 결론",
        items: [
          "암호화 설정을 `.none`으로 바꿔 확인했지만 해결되지 않아, 설정으로는 안 되는 문제라고 판단",
          "리모트 전용 명령 세션을 하나 더 두는 2단계 구조를 대안으로 검토 — 연결은 되지만 관리할 세션이 늘어남",
        ],
      },
      {
        heading: "다시 의심한 계기",
        items: [
          "동료의 PR 피드백('remote session이 꼭 .required여야 했나요?')을 받고, 구조를 늘리기 전에 앞선 결론부터 다시 확인하기로 결정",
          "확신 없이 병합하지 않기 위해 PR을 Draft로 돌리고 별도 테스트 브랜치에서 원인을 격리",
        ],
      },
      {
        heading: "진짜 원인",
        items: [
          "앞서 '`.none`으로 바꿔도 안 된다'고 확인했던 실험에서, 실제로 값을 바꾼 대상은 다른 세션이었음",
          "대상을 맞춰 remoteSession의 `encryptionPreference`를 `.none`으로 두자 그대로 해결 — 세션을 추가할 필요가 없었음",
        ],
      },
      {
        heading: "남긴 것",
        items: [
          "실패한 실험으로 가설을 버리려면 실험 자체가 맞았는지를 먼저 확인해야 한다는 것",
          "구조를 늘리는 결정은 기존 가정을 다시 검증한 뒤에 내릴 것",
        ],
      },
    ],
    links: [
      {
        label: "PR #116",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/116",
      },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "fastlane-lane-misunderstanding",
    title: "Fastlane으로 자동 배포 구현기",
    date: "2026.01.04",
    status: "IN PROGRESS",
    summary:
      "잘못 파악했던 배포 방식을 바로잡고, 목적별 Lane을 분리해 테스트·배포 파이프라인을 자동화했습니다.",
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
          "내부 테스터용 레인은 명령 한 줄로 Development IPA 빌드 → AppBox 업로드 → 설치 링크 전송까지 완료",
          "공식 배포용 레인을 따로 두어 App Store 배포용 IPA 빌드와 TestFlight 업로드까지 자동화",
        ],
      },
    ],
    links: [
      { label: "전체 기록", href: "/lab/Fastlane으로-자동-배포-구현기" },
      {
        label: "Fastlane 설정 가이드",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki/Fastlane-%EC%84%A4%EC%A0%95-%EA%B0%80%EC%9D%B4%EB%93%9C",
      },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "browser-refactor-hybrid-decision",
    title: "Browser 리팩터링 일지",
    date: "2026.01.03",
    status: "SHIPPED",
    summary:
      "콜백 구조를 AsyncStream으로 개편하되, 다중 구독 이벤트는 Combine을 유지해 리팩터링 안전성을 지켰습니다.",
    sections: [
      {
        heading: "판단",
        items: [
          "프로토콜 추출을 통한 완전한 테스트 가능 구조도 검토했지만, 이번 범위에는 과한 대규모 리팩터링이라 보류",
          "클로저로 되어 있던 콜백은 AsyncStream(BrowserEvents enum)으로 점진 이전",
          "원래 Combine으로 되어 있던 onStartTransferCommand 하나는, 두 곳에서 동시에 구독해야 해서 AsyncStream으로 바꾸면 코드 중복이 생긴다고 보고 Combine을 그대로 유지",
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
    title: "n8n으로 PR 자동 리뷰 플로우 구축하기",
    date: "2026.01",
    status: "SHIPPED",
    summary:
      "AI 리뷰 범위를 Diff로 한정하고 1차 검토용으로 역할 정의해 코드 리뷰 병목을 개선했습니다.",
    sections: [
      {
        heading: "배경",
        items: ["PR이 하루 6~12건 이상 쌓이며 리뷰가 병목이 됨"],
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
      {
        heading: "운영 방식과 결과",
        items: [
          "AI의 지적은 실제 코드와 대조해 반영 여부를 정하고, 반영하지 않은 건은 그 사유를 PR에 남김 (PR #301)",
          "AI 지적의 절반 이상을 실제 코드에 반영 (체감)",
          "팀원이 리뷰에 들이는 시간도 절반 이상 줄었다고 느낌 (체감)",
          // TODO(확인필요: 반영률·리뷰 시간은 실측이 아닌 체감치다. GitHub API로 AI 리뷰 코멘트 수 대비 반영 건수를 집계할지 결정 필요)
        ],
      },
    ],
    links: [
      {
        label: "PR #301 (미반영 사유 기록)",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/pull/301",
      },
      { label: "전체 기록", href: "/lab/n8n으로-PR-자동-리뷰-플로우-구축하기" },
    ],
    relatedProject: "mirroring-booth",
  },
  {
    slug: "ar-anchor-validation",
    title: "Google ARCore API 검증기",
    date: "2025.12.18",
    status: "DISCONTINUED",
    summary:
      "국내 환경 제약과 정밀도 한계를 확인하고, 3주 만에 AR 위치 고정 개발을 조기 중단했습니다.",
    sections: [
      {
        heading: "검증한 것",
        items: [
          "ARKit·RealityKit + Google ARCore Geospatial API로 특정 위치에 AR 콘텐츠를 저장하고, 재실행 후에도 복원되는 기능",
        ],
      },
      {
        heading: "만든 것",
        items: [
          "ARKit의 Ray Casting으로 사용자가 탭한 지점의 월드 좌표를 구하고, 그 위치에 ARCore Geospatial Anchor를 생성해 RealityKit으로 이미지를 렌더링",
          "재실행 후 복원을 위해 앵커 식별 정보와 이미지 참조만 로컬에 저장 — 저장 데이터를 최소 메타데이터로 줄이는 데는 성공",
        ],
      },
      {
        heading: "막힌 지점",
        items: [
          "ARCore Geospatial이 국내에서는 서울에서만 동작하고 그 외 지역에서는 쓸 수 없었습니다. 서비스 대상 지역에서 기능 자체가 성립하지 않는 문제였습니다.",
          "GPS로 대체하려 Core Location을 썼지만, 저장한 시점과 불러온 시점의 위치가 달랐습니다.",
          "앱 재실행과 시간 경과에 따라 VPS 기반 로컬라이제이션 상태가 바뀌면서 앵커 위치 추정이 크게 흔들렸고, 같은 자리에서도 앵커가 일관되게 재현되지 않았습니다.",
          "대안으로 본 Cloud Anchor는 실내 환경에 유리한 방식이라 야외 서비스에는 맞지 않았고, 자체 앵커 점수제는 서버 부하 때문에 접었습니다.",
        ],
      },
      {
        heading: "결론",
        items: [
          "구현 방식을 바꿔서 넘을 수 있는 문제가 아니라, 이 기술이 국내에서 제한적으로만 지원된다는 환경의 문제로 판단",
          "서비스 수준의 위치 고정을 보장할 수 없다고 보고, 더 만들기 전에 3주 만에 중단하고 기획부터 다시 시작 (2025.12.18 팀 합의)",
        ],
      },
    ],
    links: [
      { label: "전체 기록", href: "/lab/Google-ARCore-API-검증기" },
      {
        label: "중단을 합의한 회의록",
        href: "https://github.com/boostcampwm2025/iOS03-dolAwang/wiki/%F0%9F%93%81-2025.12.18-%EB%AA%A9%EC%9A%94%EC%9D%BC-%ED%9A%8C%EC%9D%98%EB%A1%9D",
      },
    ],
    relatedProject: "mirroring-booth",
  },
];

export const about: About = {
  skills: [
    {
      heading: "Programming Language",
      entries: [
        {
          name: "Swift",
          items: [
            "Swift를 사용해 iOS 앱을 개발하고 App Store에 배포한 경험이 있습니다.",
            "개발 문서를 읽고 원하는 기능을 직접 구현할 수 있습니다.",
          ],
        },
        {
          name: "Java",
          items: ["Java로 기본적인 알고리즘 문제를 해결할 수 있습니다."],
        },
        {
          name: "JavaScript",
          items: ["JavaScript로 기본적인 알고리즘 문제를 해결할 수 있습니다."],
        },
      ],
    },
    {
      heading: "Server & Database",
      entries: [
        {
          name: "MySQL",
          items: [
            "관계형 데이터베이스 모델링, 쿼리 작성, 데이터 CRUD 관리를 수행할 수 있습니다.",
          ],
        },
        {
          name: "AWS EC2",
          items: [
            "AWS EC2 인스턴스에 서버를 직접 배포하고 운영한 경험이 있습니다.",
          ],
        },
      ],
    },
    {
      heading: "협업 Tool & DevOps",
      entries: [
        {
          name: "Git / GitHub",
          items: [
            "Git과 GitHub으로 소스코드를 관리하고, PR 기반 코드 리뷰를 바탕으로 팀 협업을 진행할 수 있습니다.",
          ],
        },
        {
          name: "Notion",
          items: [
            "프로젝트 요구사항 작성, 데일리 스크럼, 협업 문서화 등 팀의 일정과 이슈를 관리할 수 있습니다.",
          ],
        },
        {
          name: "GitHub Actions / Fastlane",
          items: [
            "GitHub Actions와 Fastlane으로 TestFlight 빌드와 배포 과정을 자동화할 수 있습니다.",
          ],
        },
      ],
    },
    {
      heading: "AI & Automation",
      entries: [
        {
          name: "n8n",
          items: ["n8n으로 반복적인 업무를 자동화할 수 있습니다."],
        },
        {
          name: "Claude Code",
          items: [
            "CLAUDE.md 등 컨텍스트 정의 문서를 활용해 AI를 개발 생산성 향상에 적극 활용할 수 있습니다.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: "원광대학교",
      major: "컴퓨터소프트웨어공학과",
      period: "2020.03 — 2026.02",
      note: "졸업",
    },
  ],
  experience: [
    {
      org: "KB국민은행 KB-Bridge AI 활용 데이터 분석 과정",
      period: "2026.08 — 진행중",
    },
    {
      org: "네이버 부스트캠프 웹·모바일 10기 (iOS)",
      period: "2025.06 — 2026.02",
      note: "수료",
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
  ],
  mentoring: [
    "소프트웨어중심대학 SW길잡이 멘토단",
    "소프트웨어중심대학 SW멘토-멘티",
  ],
  contact: [
    { label: "daehyeon.ydh@gmail.com", href: "mailto:daehyeon.ydh@gmail.com" },
    { label: "GitHub", href: "https://github.com/YunDaeHyeon" },
  ],
};
