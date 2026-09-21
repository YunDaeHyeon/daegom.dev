import type { LabType } from "@/lib/lab-types";

export type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

export type PostDraft = {
  slug: string;
  title: string;
  type: LabType;
  stack: string[];
  /** YYYY-MM-DD. 저장 값의 UTC 날짜와 같은 기준이다(사이트가 그렇게 표시한다). */
  date: string;
  content: string;
};

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif"];
