export function PhotoPlaceholder() {
  return (
    <div className="flex aspect-[4/5] w-full max-w-[200px] shrink-0 flex-col items-center justify-center gap-2 rounded-md border border-border bg-muted text-muted-foreground sm:max-w-[220px]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
      <span className="text-xs">사진 자리</span>
    </div>
  );
}
