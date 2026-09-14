export type Status = "SHIPPED" | "IN PROGRESS" | "PAUSED" | "DISCONTINUED";

export function StatusLabel({ status }: { status: Status }) {
  return (
    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
      {status}
    </span>
  );
}
