import Link from "next/link";
import { LAB_TYPE_LABELS, formatLabDate, type LabPostSummary, type LabType } from "@/lib/lab-types";
import { LabTypeBadge } from "@/components/lab-type-badge";
import { StackTags } from "@/components/stack-tags";

export const PAGE_SIZE = 10;

/** `?type=&page=`를 서버에서 해석한다. 값이 없거나 범위를 벗어나면 기본값으로 떨어진다. */
export function resolveLabQuery(
  posts: LabPostSummary[],
  params: { type?: string; page?: string }
) {
  const availableTypes = (Object.keys(LAB_TYPE_LABELS) as LabType[]).filter((t) =>
    posts.some((p) => p.type === t)
  );

  const filter: LabType | "all" =
    params.type && (availableTypes as string[]).includes(params.type)
      ? (params.type as LabType)
      : "all";

  const filtered = filter === "all" ? posts : posts.filter((p) => p.type === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const requested = Number(params.page);
  const page =
    Number.isInteger(requested) && requested >= 1 && requested <= totalPages ? requested : 1;

  return { availableTypes, filter, filtered, totalPages, page };
}

function hrefFor(filter: LabType | "all", page: number) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("type", filter);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/lab?${query}` : "/lab";
}

export function LabList({
  posts,
  params,
}: {
  posts: LabPostSummary[];
  params: { type?: string; page?: string };
}) {
  const { availableTypes, filter, filtered, totalPages, page } = resolveLabQuery(posts, params);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterLink active={filter === "all"} href={hrefFor("all", 1)}>
          전체 ({posts.length})
        </FilterLink>
        {availableTypes.map((t) => (
          <FilterLink key={t} active={filter === t} href={hrefFor(t, 1)}>
            {LAB_TYPE_LABELS[t]} ({posts.filter((p) => p.type === t).length})
          </FilterLink>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-border border-t border-border">
        {pageItems.map((post) => (
          <li key={post.slug} className="py-4">
            <Link href={`/lab/${post.slug}`} className="block">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="text-base text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border">
                  {post.title}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <LabTypeBadge type={post.type} />
                  <span className="font-mono text-sm text-muted-foreground">
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
          <PageLink disabled={page === 1} href={hrefFor(filter, page - 1)}>
            이전
          </PageLink>
          <span className="font-mono text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <PageLink disabled={page === totalPages} href={hrefFor(filter, page + 1)}>
            다음
          </PageLink>
        </nav>
      )}
    </div>
  );
}

function FilterLink({
  active,
  href,
  children,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-accent text-accent"
          : "border-border text-muted-foreground hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </Link>
  );
}

function PageLink({
  disabled,
  href,
  children,
}: {
  disabled: boolean;
  href: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="text-sm text-muted-foreground opacity-40"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      scroll={false}
      className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </Link>
  );
}
