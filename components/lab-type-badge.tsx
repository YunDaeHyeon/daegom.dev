import { LAB_TYPE_LABELS, type LabType } from "@/lib/lab-types";

// Type labels are Hangul (스터디/트러블슈팅/...), so this intentionally uses
// the sans stack rather than JetBrains Mono — see The Latin-Mono Rule in
// DESIGN.md: the mono font has no Hangul glyphs and silently falls back.
export function LabTypeBadge({ type }: { type: LabType }) {
  return (
    <span className="text-[11px] font-medium text-muted-foreground">
      {LAB_TYPE_LABELS[type]}
    </span>
  );
}
