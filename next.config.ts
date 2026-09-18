import type { NextConfig } from "next";

// serverExternalPackages는 Turbopack 프로덕션 빌드에서 해시가 붙은 합성
// 패키지명(예: firebase-admin-<hash>)으로 컴파일되는데, 이 해시가 런타임에
// resolve되지 못해 "Cannot find package 'firebase-admin-<hash>'"로 /lab이
// 항상 500을 냈다 (Node/pm2 버전과 무관하게 재현됨). package.json의 build
// 스크립트에서 `next build --webpack`으로 고정해 이 경로를 피한다 — 그
// 전제가 깨지면(Turbopack으로 되돌리면) 이 버그가 다시 나타난다.
const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
