import "server-only";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "@/lib/firebase-admin";

/** 글을 쓸 수 있는 유일한 계정. Google 로그인으로 확인된 이 이메일만 통과한다. */
const OWNER_EMAIL = "daehyeon.ydh@gmail.com";

const COOKIE_NAME = "studio_session";
const SESSION_MS = 24 * 60 * 60 * 1000;
const COOKIE_PATH = "/studio";

function isOwner(token: DecodedIdToken): boolean {
  return (
    token.email?.toLowerCase() === OWNER_EMAIL &&
    token.email_verified === true &&
    token.firebase.sign_in_provider === "google.com"
  );
}

/** 요청에 유효한 세션이 있으면 사용자를, 없으면 null을 돌려준다. */
export async function getStudioUser(): Promise<{ email: string } | null> {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) return null;

  try {
    // 두 번째 인자 true: 로그아웃·계정 폐기된 세션을 걸러내기 위해 서버에 확인한다.
    const decoded = await getAdminAuth().verifySessionCookie(cookie, true);
    return isOwner(decoded) ? { email: OWNER_EMAIL } : null;
  } catch {
    return null;
  }
}

/** Google 로그인으로 받은 ID 토큰을 확인하고, 통과하면 세션 쿠키를 심는다. */
export async function openStudioSession(idToken: string): Promise<boolean> {
  const auth = getAdminAuth();

  let decoded: DecodedIdToken;
  try {
    decoded = await auth.verifyIdToken(idToken, true);
  } catch {
    return false;
  }
  if (!isOwner(decoded)) return false;

  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: SESSION_MS });
  (await cookies()).set(COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_MS / 1000,
  });
  return true;
}

/** 로그아웃. 쿠키를 지우는 데서 끝내지 않고 서버에서 세션을 폐기해, 쿠키가 복사됐더라도 쓸 수 없게 한다. */
export async function closeStudioSession(): Promise<void> {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;

  if (cookie) {
    try {
      const auth = getAdminAuth();
      const decoded = await auth.verifySessionCookie(cookie);
      // 이후 이 계정으로 발급된 모든 세션(다른 기기 포함)이 검증 단계에서 거절된다.
      await auth.revokeRefreshTokens(decoded.sub);
    } catch {
      // 이미 만료됐거나 유효하지 않은 쿠키면 지울 것만 지운다.
    }
  }

  store.set(COOKIE_NAME, "", { path: COOKIE_PATH, maxAge: 0 });
}
