"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { href: "#top", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#decisions", label: "Decisions" },
  { href: "#lab", label: "Lab" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the home page, anchors scroll within the page. On any other page
  // (e.g. a Project/Decision detail page), the same "#projects" href would
  // just append to the current URL and do nothing — so route back to the
  // home anchor instead.
  const resolveHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-6 py-5 sm:px-8">
        <Link
          href={resolveHref("#top")}
          className="shrink-0 text-sm font-medium tracking-tight text-foreground"
        >
          <span className="hidden sm:inline">윤대현 · YunDaeHyeon</span>
          <span className="sm:hidden">YunDaeHyeon</span>
        </Link>
        <nav className="ml-auto flex min-w-0 items-center gap-4 overflow-x-auto text-sm sm:gap-6">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="shrink-0 text-foreground transition-colors hover:text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
