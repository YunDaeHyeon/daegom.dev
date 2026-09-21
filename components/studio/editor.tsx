"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { publishPost, removePost, requestImageUpload } from "@/app/studio/actions";
import { LabContent } from "@/components/lab-content";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { StackTags } from "@/components/stack-tags";
import { LAB_TYPE_LABELS, type LabType } from "@/lib/lab-types";
import { slugify } from "@/lib/studio/slug";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type PostDraft } from "@/lib/studio/types";

type Props =
  | { mode: "new"; defaultDate: string }
  | { mode: "edit"; initial: PostDraft; justPublished: boolean };

type Notice = { kind: "ok" | "error"; text: string; slug?: string };

const DRAFT_KEY = "studio:draft:new";

const INPUT =
  "w-full rounded-sm border border-border bg-background px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none";

function randomId(length = 10) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)), (byte) => (byte % 36).toString(36)).join("");
}

export function Editor(props: Props) {
  const router = useRouter();
  const isNew = props.mode === "new";

  const initial: PostDraft =
    props.mode === "edit"
      ? props.initial
      : { slug: "", title: "", type: "study", stack: [], date: props.defaultDate, content: "" };

  const [title, setTitle] = useState(initial.title);
  const [slugInput, setSlugInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [type, setType] = useState<LabType>(initial.type);
  const [stack, setStack] = useState<string[]>(initial.stack);
  const [tagInput, setTagInput] = useState("");
  const [date, setDate] = useState(initial.date);
  const [content, setContent] = useState(initial.content);

  const [view, setView] = useState<"write" | "preview">("write");
  const [uploads, setUploads] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState<"publish" | "delete" | null>(null);
  const [notice, setNotice] = useState<Notice | null>(
    props.mode === "edit" && props.justPublished
      ? { kind: "ok", text: "게시했습니다.", slug: props.initial.slug }
      : null
  );
  const [restored, setRestored] = useState(false);
  const [baseline, setBaseline] = useState(initial);

  // 이미지가 올라갈 S3 경로. 글 주소를 바꿔도 이미 올린 이미지가 깨지지 않게 글과 무관하게 정한다.
  const [postId] = useState(() => randomId());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slug = isNew ? (slugTouched ? slugInput : slugify(title)) : initial.slug;

  const dirty =
    title !== baseline.title ||
    type !== baseline.type ||
    date !== baseline.date ||
    content !== baseline.content ||
    stack.join("\n") !== baseline.stack.join("\n");

  // 새 글은 실수로 창을 닫아도 내용이 남도록 브라우저에 임시 저장한다.
  // 복원은 브라우저에서만 가능하므로 화면이 그려진 뒤 한 번 읽어 온다.
  useEffect(() => {
    if (!isNew) return;
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (!saved) return;
        const draft = JSON.parse(saved);
        if (!draft.title && !draft.content) return;
        setTitle(String(draft.title ?? ""));
        setSlugInput(String(draft.slugInput ?? ""));
        setSlugTouched(Boolean(draft.slugTouched));
        setType(draft.type in LAB_TYPE_LABELS ? draft.type : "study");
        setStack(Array.isArray(draft.stack) ? draft.stack.map(String) : []);
        setDate(typeof draft.date === "string" ? draft.date : initial.date);
        setContent(String(draft.content ?? ""));
        setRestored(true);
      } catch {
        // 저장된 값이 깨져 있으면 무시한다.
      }
    }, 0);
    return () => clearTimeout(timer);
    // 처음 한 번만 복원한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  useEffect(() => {
    if (!isNew || !dirty) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ title, slugInput, slugTouched, type, stack, date, content })
        );
      } catch {
        // 저장 공간이 없으면 임시 저장만 건너뛴다.
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [isNew, dirty, title, slugInput, slugTouched, type, stack, date, content]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function addTags(raw: string) {
    const next = raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (next.length === 0) return;
    setStack((prev) => [...new Set([...prev, ...next])]);
    setTagInput("");
  }

  function insertAtCursor(text: string) {
    const area = textareaRef.current;
    const start = area?.selectionStart ?? content.length;
    const end = area?.selectionEnd ?? start;
    setContent((prev) => {
      const before = prev.slice(0, start);
      const lead = before && !before.endsWith("\n") ? "\n" : "";
      return `${before}${lead}${text}\n${prev.slice(end)}`;
    });
  }

  async function uploadOne(file: File) {
    if (file.size > MAX_IMAGE_BYTES) {
      setNotice({ kind: "error", text: `${file.name}: 이미지는 10MB 이하여야 합니다.` });
      return;
    }

    const token = `![업로드 중…](#upload-${randomId(8)})`;
    insertAtCursor(token);
    setUploads((count) => count + 1);

    try {
      const requested = await requestImageUpload({ postId, contentType: file.type, size: file.size });
      if (!requested.ok) throw new Error(requested.error);

      const { url, fields, publicUrl } = requested.ticket;
      const form = new FormData();
      for (const [name, value] of Object.entries(fields)) form.append(name, value);
      form.append("file", file); // S3는 file 필드가 맨 마지막이어야 한다.

      const response = await fetch(url, { method: "POST", body: form });
      if (!response.ok) throw new Error(`업로드에 실패했습니다. (${response.status})`);

      setContent((prev) => prev.replace(token, () => `![](${publicUrl})`));
    } catch (error) {
      setContent((prev) => prev.replace(`${token}\n`, () => "").replace(token, () => ""));
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "업로드에 실패했습니다." });
    } finally {
      setUploads((count) => count - 1);
    }
  }

  function uploadFiles(files: File[]) {
    const images = files.filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    if (images.length < files.length) {
      setNotice({ kind: "error", text: "PNG, JPEG, GIF, WebP, AVIF 이미지만 올릴 수 있습니다." });
    }
    for (const file of images) void uploadOne(file);
  }

  const hasPendingUpload = uploads > 0 || content.includes("](#upload-");

  async function publish() {
    setNotice(null);
    setBusy("publish");
    const pendingTags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const finalStack = [...new Set([...stack, ...pendingTags])];

    const result = await publishPost({ isNew, slug, title, type, stack: finalStack, date, content });
    setBusy(null);

    if (!result.ok) {
      setNotice({ kind: "error", text: result.error });
      return;
    }

    setStack(finalStack);
    setTagInput("");
    setBaseline({ slug, title, type, stack: finalStack, date, content });

    if (isNew) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // 무시
      }
      router.replace(`/studio/edit/${encodeURIComponent(result.slug)}?published=1`);
      return;
    }
    setNotice({ kind: "ok", text: "게시했습니다.", slug: result.slug });
  }

  async function remove() {
    if (!window.confirm("이 글을 삭제할까요?\n사이트에서는 바로 사라지고, 사본은 휴지통 컬렉션에 남습니다.")) return;
    setBusy("delete");
    const result = await removePost(slug);
    if (!result.ok) {
      setBusy(null);
      setNotice({ kind: "error", text: result.error });
      return;
    }
    setBaseline({ slug, title, type, stack, date, content });
    router.replace("/studio");
  }

  const canPublish = !busy && !hasPendingUpload && title.trim() !== "" && content.trim() !== "" && slug !== "";

  const previewDate = useMemo(() => date.replaceAll("-", "."), [date]);

  return (
    <div>
      <div className="sticky top-[61px] z-[5] -mx-1 flex items-center justify-between gap-4 border-b border-border bg-background px-1 py-3">
        <Link
          href="/studio"
          className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← 목록
        </Link>

        <div className="flex items-center gap-3">
          <div role="group" aria-label="보기 전환" className="flex overflow-hidden rounded-sm border border-border text-sm">
            {(["write", "preview"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                onClick={() => setView(value)}
                className={`px-3 py-1.5 transition-colors ${
                  view === value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {value === "write" ? "작성" : "미리보기"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={publish}
            disabled={!canPublish}
            className="rounded-sm bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-40"
          >
            {busy === "publish" ? "게시 중…" : isNew ? "게시하기" : "수정 게시"}
          </button>
        </div>
      </div>

      <div aria-live="polite" className="min-h-6 pt-3 text-sm">
        {notice && (
          <p className={notice.kind === "error" ? "text-foreground" : "text-muted-foreground"}>
            {notice.kind === "error" ? "⚠ " : ""}
            {notice.text}
            {notice.slug && (
              <>
                {" "}
                <Link
                  href={`/lab/${notice.slug}`}
                  target="_blank"
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  글 보기
                </Link>
              </>
            )}
          </p>
        )}
        {restored && !notice && (
          <p className="text-muted-foreground">임시 저장된 내용을 불러왔습니다.</p>
        )}
      </div>

      {view === "write" ? (
        <div className="mt-4 space-y-5">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목"
            aria-label="제목"
            className={`${INPUT} text-xl font-semibold`}
          />

          <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
            <label className="block text-sm text-muted-foreground">
              글 주소
              <div className="mt-1 flex items-center gap-2">
                <span className="shrink-0 font-mono text-sm">/lab/</span>
                <input
                  type="text"
                  value={slug}
                  readOnly={!isNew}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlugInput(event.target.value);
                  }}
                  aria-label="글 주소"
                  className={`${INPUT} font-mono text-sm ${isNew ? "" : "opacity-60"}`}
                />
              </div>
            </label>
            <label className="block text-sm text-muted-foreground">
              분류
              <select
                value={type}
                onChange={(event) => setType(event.target.value as LabType)}
                className={`${INPUT} mt-1`}
              >
                {Object.entries(LAB_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted-foreground">
              날짜
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`${INPUT} mt-1 font-mono text-sm`}
              />
            </label>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-sm bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`${tag} 태그 삭제`}
                    onClick={() => setStack((prev) => prev.filter((item) => item !== tag))}
                    className="px-0.5 hover:text-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === ",") {
                    event.preventDefault();
                    addTags(tagInput);
                  } else if (event.key === "Backspace" && !tagInput && stack.length > 0) {
                    setStack((prev) => prev.slice(0, -1));
                  }
                }}
                onBlur={() => addTags(tagInput)}
                placeholder="태그 입력 후 Enter"
                aria-label="태그"
                className="min-w-40 flex-1 bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>
                {uploads > 0 ? `이미지 ${uploads}장 올리는 중…` : "이미지는 붙여넣기, 끌어다 놓기, 파일 선택으로 넣을 수 있습니다."}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 whitespace-nowrap text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
              >
                이미지 추가
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                multiple
                hidden
                onChange={(event) => {
                  uploadFiles(Array.from(event.target.files ?? []));
                  event.target.value = "";
                }}
              />
            </div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              onPaste={(event) => {
                const files = Array.from(event.clipboardData.files);
                if (files.some((file) => file.type.startsWith("image/"))) {
                  event.preventDefault();
                  uploadFiles(files);
                }
              }}
              onDragOver={(event) => {
                if (event.dataTransfer.types.includes("Files")) {
                  event.preventDefault();
                  setDragging(true);
                }
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                if (!event.dataTransfer.types.includes("Files")) return;
                event.preventDefault();
                setDragging(false);
                uploadFiles(Array.from(event.dataTransfer.files));
              }}
              placeholder="마크다운으로 본문을 작성하세요."
              aria-label="본문"
              spellCheck={false}
              className={`${INPUT} min-h-[60vh] resize-y font-mono text-sm leading-7 ${
                dragging ? "border-accent" : ""
              }`}
            />
          </div>

          {!isNew && (
            <div className="border-t border-border pt-5">
              <button
                type="button"
                onClick={remove}
                disabled={busy !== null}
                className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent disabled:opacity-40"
              >
                {busy === "delete" ? "삭제 중…" : "이 글 삭제"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-[70ch]">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title || "제목 없음"}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <LabTypeBadge type={type} />
            <span className="font-mono text-sm text-muted-foreground">{previewDate}</span>
          </div>
          <StackTags stack={stack} />
          <LabContent markdown={content} />
        </div>
      )}
    </div>
  );
}
