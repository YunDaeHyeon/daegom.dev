import "server-only";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "@/lib/firebase-admin";

/** 글을 쓸 수 있는 유일한 계정. Google 로그인으로 확인된 이 이메일만 통과한다. */
const OWNER_EMAIL = "daehyeon.ydh@gmail.com";

const COOKIE_NAME = "studio_session";
const SESSION_MS = 5 * 24 * 60 * 60 * 1000;
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

export async function closeStudioSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, "", { path: COOKIE_PATH, maxAge: 0 });
}
