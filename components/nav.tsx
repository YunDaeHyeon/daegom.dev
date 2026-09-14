import Link from "next/link";

const primaryLinks = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#decisions", label: "Decisions" },
];

const upcomingLinks = ["About", "Lab", "Writing"];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5 sm:px-8">
        <Link
          href="#top"
          className="text-sm font-medium tracking-tight text-foreground"
        >
          <span className="hidden sm:inline">윤대현 · YunDaeHyeon</span>
          <span className="sm:hidden">YunDaeHyeon</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-6">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground transition-colors hover:text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
          {upcomingLinks.map((label) => (
            <span
              key={label}
              aria-disabled="true"
              className="hidden text-muted-foreground/50 sm:inline"
            >
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
