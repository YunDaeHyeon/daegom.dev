"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LAB_TYPE_LABELS, formatLabDate, type LabPostSummary, type LabType } from "@/lib/lab-types";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { StackTags } from "@/components/stack-tags";

const PAGE_SIZE = 10;

export function LabList({ posts }: { posts: LabPostSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableTypes = useMemo(() => {
    const set = new Set(posts.map((p) => p.type));
    return (Object.keys(LAB_TYPE_LABELS) as LabType[]).filter((t) => set.has(t));
  }, [posts]);

  const typeParam = searchParams.get("type");
  const filter: LabType | "all" =
    typeParam && (availableTypes as string[]).includes(typeParam) ? (typeParam as LabType) : "all";

  const filtered = filter === "all" ? posts : posts.filter((p) => p.type === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam >= 1 && pageParam <= totalPages ? pageParam : 1;

  function updateParams(next: { type?: LabType | "all"; page?: number }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.type !== undefined) {
      if (next.type === "all") params.delete("type");
      else params.set("type", next.type);
      params.delete("page");
    }
    if (next.page !== undefined) {
      if (next.page <= 1) params.delete("page");
      else params.set("page", String(next.page));
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={filter === "all"} onClick={() => updateParams({ type: "all" })}>
          전체 ({posts.length})
        </FilterButton>
        {availableTypes.map((t) => (
          <FilterButton key={t} active={filter === t} onClick={() => updateParams({ type: t })}>
            {LAB_TYPE_LABELS[t]} ({posts.filter((p) => p.type === t).length})
          </FilterButton>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-border border-t border-border">
        {pageItems.map((post) => (
          <li key={post.slug} className="py-4">
            <Link href={`/lab/${post.slug}`} className="block">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-sm text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border">
                  {post.title}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <LabTypeBadge type={post.type} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatLabDate(post.createdAt)}
                  </span>
                </span>
              </div>
              <StackTags stack={post.stack} />
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-4" aria-label="페이지네이션">
          <PageButton disabled={page === 1} onClick={() => updateParams({ page: page - 1 })}>
            이전
          </PageButton>
          <span className="font-mono text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          <PageButton disabled={page === totalPages} onClick={() => updateParams({ page: page + 1 })}>
            다음
          </PageButton>
        </nav>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-accent text-accent"
          : "border-border text-muted-foreground hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function PageButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent disabled:pointer-events-none disabled:text-muted-foreground disabled:opacity-40 disabled:no-underline"
    >
      {children}
    </button>
  );
}
