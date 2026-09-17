# daegom.dev

윤대현의 개인 포트폴리오 사이트입니다.

주장을 그대로 받아들이게 하기보다, 검증 가능한 형태로 남기는 걸 목표로
만들었습니다. 실제로 담당한 범위만 적고, 중단되거나 보류된 프로젝트도
숨기지 않고 남깁니다.

## 구성

- **Work** — 실제로 참여해 만든 프로젝트와, 그중 본인이 직접 담당한 범위
- **Decisions** — 그 과정에서 있었던 판단의 기록. 중단되거나 보류된 것도
  포함합니다
- **About** — 학력, 경력, 활동 이력
- **Lab** — 업무 외에 궁금해서 만들어본 것들 (준비 중)

## 스택

Next.js (App Router) · TypeScript · Tailwind CSS

Work/Decisions 상세 페이지는 인터셉트 라우트(Intercepting Route)로
모달과 전체 페이지 두 방식으로 모두 진입 가능하게 되어 있습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 배포

`daegom.dev`(이 사이트)와 `n8n.daegom.dev`(개인 자동화 워크플로우)가
같은 서버를 서브도메인으로 나눠 씁니다. 이 앱은 인터셉트 라우트로 모달을
띄우는 구조라 정적 export가 되지 않아, `next start`로 상시 구동되는
Node 프로세스가 필요합니다. EC2에 PM2로 프로세스를 띄우고 Nginx로
리버스 프록시합니다. 자세한 절차는 [deploy/README.md](deploy/README.md)를
참고하세요.
