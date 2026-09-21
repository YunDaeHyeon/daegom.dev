export type LabType = "study" | "experiment" | "deploy" | "troubleshoot" | "retrospective" | "conference";

export const LAB_TYPE_LABELS: Record<LabType, string> = {
  study: "스터디",
  experiment: "실험",
  deploy: "배포",
  troubleshoot: "트러블슈팅",
  retrospective: "회고",
  conference: "컨퍼런스",
};

export type LabPostSummary = {
  slug: string;
  title: string;
  type: LabType;
  source: "velog" | "notion" | "admin";
  createdAt: string;
  dateApprox: boolean;
  pinned: boolean;
  stack: string[];
};

export type LabPost = LabPostSummary & {
  content: string;
  sourceUrl: string | null;
};

export function formatLabDate(createdAt: string): string {
  const d = new Date(createdAt);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}.${String(m).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
}
