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

const body = await res.text();
if (!res.ok) {
  console.error(`실패 (${res.status}): ${body}`);
  process.exit(1);
}
console.log(`${site} 갱신 완료: ${body}`);
