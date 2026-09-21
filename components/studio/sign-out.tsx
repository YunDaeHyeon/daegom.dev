"use client";

import { useRouter } from "next/navigation";
import { endSession } from "@/app/studio/actions";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await endSession();
        router.refresh();
      }}
      className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
    >
      로그아웃
    </button>
  );
}
