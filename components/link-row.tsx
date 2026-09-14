import type { ExternalLink } from "@/lib/content";

export function LinkRow({ links }: { links: ExternalLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
