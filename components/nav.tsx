import Link from "next/link";

const primaryLinks = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#decisions", label: "Decisions" },
  { href: "#about", label: "About" },
  { href: "#lab", label: "Lab" },
];

const upcomingLinks = ["Writing"];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-6 py-5 sm:px-8">
        <Link
          href="#top"
          className="shrink-0 text-sm font-medium tracking-tight text-foreground"
        >
          <span className="hidden sm:inline">윤대현 · YunDaeHyeon</span>
          <span className="sm:hidden">YunDaeHyeon</span>
        </Link>
        <nav className="ml-auto flex min-w-0 items-center gap-4 overflow-x-auto text-sm sm:gap-6">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 text-foreground transition-colors hover:text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
          {upcomingLinks.map((label) => (
            <span
              key={label}
              aria-disabled="true"
              className="hidden shrink-0 text-muted-foreground/50 sm:inline"
            >
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
