/**
 * Lab 글을 올린 뒤 실제 사이트의 목록 캐시를 바로 갱신한다.
 *
 *   npm run revalidate                      # https://daegom.dev
 *   SITE_URL=http://localhost:3000 npm run revalidate
 *
 * REVALIDATE_SECRET은 .env.local에서 읽으며, 서버(EC2)의 값과 같아야 한다.
 */
const secret = process.env.REVALIDATE_SECRET;
if (!secret) {
  console.error("REVALIDATE_SECRET이 없습니다. .env.local을 확인하세요.");
  process.exit(1);
}

const site = (process.env.SITE_URL ?? "https://daegom.dev").replace(/\/$/, "");
const res = await fetch(`${site}/api/revalidate`, {
  method: "POST",
  headers: { authorization: `Bearer ${secret}` },
});

const HINTS = {
  401: "REVALIDATE_SECRET이 서버와 다릅니다. .env.local과 GitHub Secret이 같은 값인지 확인하세요.",
  404: "서버에 /api/revalidate가 없습니다. 이 기능이 담긴 커밋이 아직 배포되지 않았습니다.",
  503: "서버에 REVALIDATE_SECRET이 비어 있습니다. GitHub Secret을 추가한 뒤 다시 배포하세요.",
};

if (!res.ok) {
  console.error(`실패 (${res.status}): ${HINTS[res.status] ?? "예상하지 못한 응답입니다."}`);
  process.exit(1);
}
console.log(`${site} 갱신 완료: ${await res.text()}`);
