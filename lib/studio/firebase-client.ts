import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Google 계정 선택 창을 띄우고, 서버가 확인할 ID 토큰을 돌려준다.
 *  세션은 서버 쿠키가 맡으므로 브라우저 쪽 Firebase 로그인 상태는 바로 지운다. */
export async function signInWithGoogle(): Promise<string> {
  if (!config.apiKey || !config.authDomain || !config.projectId) {
    throw new Error("Firebase 웹 설정이 없습니다. 환경 변수를 확인해 주세요.");
  }

  const app = getApps()[0] ?? initializeApp(config);
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const credential = await signInWithPopup(auth, provider);
  const idToken = await credential.user.getIdToken();
  await signOut(auth);
  return idToken;
}
