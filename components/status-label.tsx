export type Status = "SHIPPED" | "IN PROGRESS" | "PAUSED" | "DISCONTINUED";

const STATUS_LABELS: Record<Status, string> = {
  SHIPPED: "적용 완료",
  "IN PROGRESS": "진행 중",
  PAUSED: "보류",
  DISCONTINUED: "중단",
};

export function StatusLabel({ status }: { status: Status }) {
  return (
    <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {STATUS_LABELS[status]}
    </span>
  );
}
