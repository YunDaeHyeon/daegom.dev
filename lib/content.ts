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
  {
    slug: "airdrop-share-sheet-across-devices",
    title: "에어드랍은 API가 아니라 시스템 공유 기능의 일부였습니다",
    date: "2025-12-15",
    status: "SHIPPED",
    summary:
      "에어드랍 공유를 직접 구현하려다, 이것이 별도 API가 아니라 iOS의 공유 시스템(Activity) 중 하나라는 걸 알게 됐습니다. UIKit과 SwiftUI 각각에 맞는 구현 방식을 정리했습니다.",
    sections: [
      {
        heading: "시도와 발견",
        items: [
          "UIActivityViewController로 구현 시작 — activityItems/applicationActivities 동작 확인",
          "아이패드 실기기 테스트 중 팝오버 위치 미지정 시 크래시 재현",
          "SwiftUI(16+)의 ShareLink는 Transferable 프로토콜이 별도로 필요함을 확인",
        ],
      },
      {
        heading: "결론",
        items: [
          "아이폰은 전체화면, 아이패드는 팝오버로 모달 표시 방식이 다르다는 것이 크래시의 근본 원인이었음을 확인",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Airdrop-구현-방법을-알아보자" }],
  },
  {
    slug: "vapor-eb-deploy-my-mistake",
    title: "제 실수였습니다, 라고 인정하는 데 2시간 걸렸습니다",
    date: "2025-10-12",
    status: "IN PROGRESS",
    summary:
      "Vapor 서버를 Elastic Beanstalk에 자동 배포하다 두 번의 실패를 겪었습니다. 하나는 빌드 산출물 크기 문제였고, 다른 하나는 제가 작성한 설정 파일이 원인이었습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "eb deploy 시 zip 용량 초과(FileTooLargeError) 발생 → .ebignore로 빌드 산출물 제외",
          "재배포 시 SPM 'overlapping sources' 에러 발생",
          "원인을 추적한 끝에 방금 만든 .ebignore가 Tests/ 디렉터리까지 제외해버렸다는 것을 발견",
          "프리티어 인스턴스에서 빌드 타임아웃 발생 — swap 메모리로 우회 시도",
        ],
      },
      {
        heading: "판단",
        items: [
          "CLI에서는 타임아웃으로 보여도 AWS 콘솔에서는 실제 배포가 완료되어 있는 경우가 있음을 확인",
          "완전 자동화(git push만으로 배포)는 이번 범위에서 완성하지 못해 다음 과제로 남김",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Vapor-Elastic-Beanstalk-배포기" }],
  },
  {
    slug: "banknote-classifier-split-ratio",
    title: "데이터 분할 비율, 감이 아니라 실측으로 정했습니다",
    date: "2025-10-07",
    status: "SHIPPED",
    summary:
      "지폐 이미지 분류 모델을 만들면서 훈련/검증/테스트 비율을 세 가지로 나눠 직접 비교했습니다. 문서화되지 않은 부분은 인정하고, 판단 가능한 부분은 실측 데이터로 결정했습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "8:1:1 비율로 1차 모델 학습(45 iteration)",
          "9:0.5:0.5 비율에 Flip augmentation을 더해 2차 모델 학습(25 iteration)",
          "7:1.5:1.5 비율로 3차 모델 학습 후 세 모델의 훈련/검증 정확도 비교",
        ],
      },
      {
        heading: "판단",
        items: [
          "CreateML의 특징 추출기 내부 알고리즘은 문서에 없다는 것을 그대로 인정",
          "과적합-신뢰도 트레이드오프는 훈련/검증 정확도 비교로 직접 검증 가능하다고 보고 실험 설계",
          "2차 모델(9:0.5:0.5)이 훈련 92.8%/검증 99.0%로 가장 우수해 채택",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/CreateML을-사용한-이미지-분류-모델-만들기" }],
  },
  {
    slug: "toxic-review-detection-model",
    title: "정확도만 보고 모델을 고르지 않았습니다",
    date: "2025-09-27",
    status: "SHIPPED",
    summary:
      "숙소 후기 비속어 감지 모델을 만들면서 단일 데이터셋으로는 정상 후기까지 욕설로 오탐하는 문제를 겪었습니다. 도메인이 다른 데이터셋을 섞어 재학습해 정상 판별 성능을 크게 끌어올렸습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "멀티라벨(욕설+숙소무관) 분류를 시도했으나 CreateML이 단일 라벨만 지원해 방향 전환",
          "문맥형 욕설·은어·오타에 강하다는 근거로 BERT CJK 계열 모델 선택",
          "UnSmile 데이터셋만으로 학습한 모델A는 정상 후기 재현율이 낮아 F1 0.80에 그침",
        ],
      },
      {
        heading: "판단과 개선",
        items: [
          "문제는 모델이 아니라 '숙소 리뷰다운 정상 문장'을 학습하지 못한 데이터라고 판단",
          "UnSmile의 욕설 데이터에 Booking.com 실제 호텔 리뷰의 정상 문장을 더한 커스텀 데이터셋으로 재학습",
          "모델B는 정상 후기 F1 0.95로 개선되어 채택, 차단 기준(toxic 35~40%)은 잠정치로 설정",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/숙소-후기-비속어-감지-모델-구현기" }],
  },
  {
    slug: "list-vs-lazyvstack-memory",
    title: "셀을 재사용한다는 말, 진짜인지 메모리로 확인했습니다",
    date: "2025-08-22",
    status: "SHIPPED",
    summary:
      "SwiftUI List가 내부적으로 셀을 재사용한다는 설명을 그대로 받아들이지 않고, Cell Tree와 Instruments 프로파일링으로 직접 확인했습니다. List와 LazyVStack의 실제 메모리 동작 차이를 실측으로 정리했습니다.",
    sections: [
      {
        heading: "검증",
        items: [
          "List/LazyVStack/ScrollView+LazyVStack 세 구조의 View Hierarchy를 직접 비교",
          "List의 Cell Tree에서 dequeueReusableCell 문자열을 직접 검색해 재사용 여부 확인",
          "Instruments(Time Profiler, Allocations)로 1000개 Row 스크롤 시 메모리 변화 프로파일링",
        ],
      },
      {
        heading: "결론",
        items: [
          "List는 셀을 재사용하지만 스크롤한 셀이 메모리에서 해제되지 않아 대규모 데이터엔 부적합함을 확인",
          "ScrollView+LazyVStack은 지연 로딩으로 메모리를 일정하게 유지해 대규모 리스트에 더 유리하다고 판단",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/List와-LazyVstack-성능-분석" }],
  },
  {
    slug: "keychain-when-docs-run-out",
    title: "공식 문서가 멈춘 곳에서부터는 직접 찾았습니다",
    date: "2025-08-09",
    status: "SHIPPED",
    summary:
      "Keychain으로 민감정보를 다루면서 4개의 API(추가/조회/수정/삭제)로 구조를 정리했습니다. OSStatus 반환값의 의미는 공식 문서에 없어서, 커뮤니티 자료를 찾아 채워 넣었습니다.",
    sections: [
      {
        heading: "정리",
        items: [
          "iOS는 앱마다 격리된 단일 Keychain을, macOS는 여러 Keychain을 쓴다는 차이 확인",
          "Data와 Attribute를 묶어 암호화 저장하는 Item 구조를 파악",
          "상황별로 SecItemAdd/CopyMatching/Update/Delete 4개 API를 매핑",
        ],
      },
      {
        heading: "막힌 지점과 해결",
        items: [
          "SecItemAdd가 반환하는 OSStatus 코드의 의미가 공식 문서에 나와 있지 않음을 확인",
          "osstatus.com 같은 커뮤니티 레퍼런스로 대체해 코드 의미를 채워 넣음",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/KeyChain에-대해" }],
  },
  {
    slug: "uitableview-static-cell-claim",
    title: "문서 설명을 믿는 대신 새 프로젝트를 하나 더 만들었습니다",
    date: "2025-06-17",
    status: "SHIPPED",
    summary:
      "UITableView 문서에 나온 'Static Cell은 UITableViewController 없이 안 된다'는 설명을 그대로 믿지 않고, 별도 프로젝트로 직접 재현해 검증했습니다.",
    sections: [
      {
        heading: "학습",
        items: [
          "DataSource/Delegate 구조와 UITableViewController 사용 시 자동 연결되는 부분을 코드로 직접 구현하며 비교",
          "plain/grouped/insetGrouped 스타일과 섹션, 스와이프 액션까지 구현",
        ],
      },
      {
        heading: "검증",
        items: [
          "'Static Cell은 UITableViewController가 필요하다'는 문서 설명을 새 프로젝트로 직접 재현",
          "Static Cells 속성을 바꿔가며 실제로 오류가 나는지 확인해 문서 내용이 사실임을 확인",
          "동적 셀은 두 방식(TableViewController / 일반 ViewController) 모두 가능함을 함께 정리",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/UITableView에-대해" }],
  },
  {
    slug: "pod-install-ruby-version",
    title: "에러 로그 마지막 줄이 진짜 원인이었습니다",
    date: "2025-01-09",
    status: "SHIPPED",
    summary:
      "pod install이 gem을 못 찾는다는 에러로 실패했습니다. gem 미설치, rbenv 버전 불일치, PATH 문제 세 가지를 의심하다, 로그 마지막 줄에서 진짜 원인을 찾았습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "gem install cocoapods 재시도 → 디렉터리 생성 오류",
          "sudo로 재시도 → cocoapods의 의존 라이브러리 drb 설치 중 버전 오류 발생",
          "로그를 끝까지 읽어 drb가 Ruby 2.7 이상을 요구하는데 현재 Ruby가 2.6.10이라는 것을 확인",
        ],
      },
      {
        heading: "해결",
        items: ["rbenv로 Ruby를 3.1.2로 올리고 global 설정 후 cocoapods 재설치"],
      },
    ],
    links: [
      {
        label: "전체 기록",
        href: "/lab/pod-install-findspecforexe-cant-find-gem-cocoapods-0.a-with-executable-pod-GemGemNotFoundException",
      },
    ],
  },
  {
    slug: "auth-state-loading-vs-unauthenticated",
    title: "'아직 모름'과 '로그인 안 됨'은 다른 상태입니다",
    date: "2024-08-07",
    status: "SHIPPED",
    summary:
      "로그인된 사용자가 새로고침 시 로그인 페이지로 튕기는 버그를 만났습니다. isAuthenticated 하나로는 '확인 중'과 '로그인 안 됨'을 구분할 수 없다는 게 원인이었습니다.",
    sections: [
      {
        heading: "문제",
        items: [
          "onAuthStateChanged의 비동기 처리가 끝나기 전에 ProtectedRoute가 먼저 렌더링됨",
          "이 시점의 isAuthenticated는 아직 false/null이라 로그인된 사용자도 리다이렉트됨",
        ],
      },
      {
        heading: "해결",
        items: [
          "isCheckingAuth라는 별도 상태를 추가해 '확인 중'과 '로그인 안 됨'을 분리",
          "확인 중에는 LoadingScreen을 보여주도록 렌더링 분기를 변경해 오탐 리다이렉트 제거",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Firebase의-onAuthStateChanged-사용-시-초기-렌더링-문제" }],
  },
  {
    slug: "vite-env-not-dotenv",
    title: "재설치를 세 번 하고 나서야 원인을 찾았습니다",
    date: "2024-08-07",
    status: "SHIPPED",
    summary:
      "dotenv로 Firebase API 키를 관리하려다 브라우저에서 'process is not defined' 에러를 만났습니다. Firebase SDK 문제인 줄 알고 재설치만 반복하다, 빌드 도구마다 환경 변수 주입 방식이 다르다는 걸 뒤늦게 알았습니다.",
    sections: [
      {
        heading: "시도",
        items: [
          "Firebase SDK 문제라고 짐작해 재설치를 3~4번 반복",
          "dotenv는 Node.js 전용(process.env) 라이브러리라 브라우저 번들에서는 애초에 동작하지 않는다는 걸 확인",
        ],
      },
      {
        heading: "해결",
        items: [
          "Vite 프로젝트에 맞게 dotenv를 걷어내고 import.meta.env + VITE_ 접두사 방식으로 전환",
          "TypeScript가 ImportMeta.env 타입을 인식하지 못하는 2차 오류는 env.d.ts와 tsconfig의 vite/client 타입 추가로 해결",
        ],
      },
    ],
    links: [{ label: "전체 기록", href: "/lab/Uncaught-ReferenceError-process-is-not-defined" }],
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
