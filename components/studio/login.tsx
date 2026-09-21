"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startSession } from "@/app/studio/actions";
import { signInWithGoogle } from "@/lib/studio/firebase-client";

export function StudioLogin() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login() {
    setPending(true);
    setError(null);
    try {
      const idToken = await signInWithGoogle();
      const result = await startSession(idToken);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    } catch (cause) {
      const code = (cause as { code?: string }).code;
      // 사용자가 창을 닫은 경우는 오류로 보여주지 않는다.
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        setError(cause instanceof Error ? cause.message : "로그인하지 못했습니다.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm py-24 text-center">
      <button
        type="button"
        onClick={login}
        disabled={pending}
        className="rounded-sm border border-border px-5 py-3 text-base font-medium text-foreground transition-colors hover:border-accent disabled:opacity-50"
      >
        {pending ? "확인 중…" : "Google로 로그인"}
      </button>
      {error && (
        <p role="alert" className="mt-4 text-sm text-foreground">
          {error}
        </p>
      )}
    </div>
  );
}
