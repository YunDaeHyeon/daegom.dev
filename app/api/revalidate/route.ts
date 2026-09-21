import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

/** Lab 글을 올린 직후 목록 캐시를 비워, 1시간을 기다리지 않고 바로 보이게 한다.
 *
 *  POST /api/revalidate   Authorization: Bearer <REVALIDATE_SECRET>
 *
 *  비밀값이 서버에 설정되어 있지 않으면 어떤 요청도 받지 않는다(fail closed). */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "REVALIDATE_SECRET is not configured" }, { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  const given = header.replace(/^Bearer\s+/i, "");

  if (!isSameSecret(given, secret)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  // expire: 0 — 오래된 목록을 잠깐이라도 보여주지 않고 다음 요청에서 바로 새로 읽는다.
  revalidateTag("lab-posts", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/lab");
  revalidatePath("/lab/[slug]", "page");

  return Response.json({ revalidated: true, at: new Date().toISOString() });
}

/** 길이가 달라도 비교 시간이 새어 나가지 않도록 같은 길이로 맞춰 비교한다. */
function isSameSecret(given: string, secret: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  if (a.length !== b.length) {
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}
