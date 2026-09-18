import type { DetailSection } from "@/lib/content";

export function DetailSections({ sections }: { sections: DetailSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.heading}>
          <h2 className="text-base font-semibold text-foreground">
            {section.heading}
          </h2>
          <ul className="mt-3 space-y-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-base leading-7 text-foreground/90"
              >
                <span aria-hidden="true" className="text-muted-foreground">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
