"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const dismiss = () => router.back();

  useEffect(() => {
    scrollRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) dismiss();
      }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-10"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-border bg-background shadow-modal sm:max-h-[min(80dvh,820px)] sm:rounded-md"
      >
        <div
          ref={scrollRef}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-10 outline-none sm:px-10"
        >
          <div className="sticky top-0 z-10 -mx-6 flex justify-end bg-background px-3 py-2 sm:-mx-10 sm:px-6 sm:py-3">
            <button
              type="button"
              onClick={dismiss}
              aria-label="닫기"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
