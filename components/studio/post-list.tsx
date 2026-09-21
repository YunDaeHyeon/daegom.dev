"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LAB_TYPE_LABELS, type LabType } from "@/lib/lab-types";

export type PostRow = {
  slug: string;
  title: string;
  type: LabType;
  createdAt: string;
  source: "velog" | "notion" | "admin";
};

const SOURCE_LABELS = { velog: "Velog", notion: "Notion", admin: "직접 작성" } as const;

export function PostList({ posts }: { posts: PostRow[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter(
      (post) => post.title.toLowerCase().includes(needle) || post.slug.toLowerCase().includes(needle)
    );
  }, [posts, query]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제목으로 검색"
          aria-label="제목으로 검색"
          className="w-full max-w-sm rounded-sm border border-border bg-background px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
        />
        <span className="shrink-0 font-mono text-sm text-muted-foreground">{visible.length}편</span>
      </div>

      <ul className="mt-6 divide-y divide-border border-t border-border">
        {visible.map((post) => (
          <li key={post.slug} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <Link
              href={`/studio/edit/${encodeURIComponent(post.slug)}`}
              className="text-base text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-border"
            >
              {post.title}
            </Link>
            <span className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
              <span>{LAB_TYPE_LABELS[post.type]}</span>
              <span>{SOURCE_LABELS[post.source]}</span>
              <span className="font-mono">{post.createdAt.slice(0, 10).replaceAll("-", ".")}</span>
              <Link
                href={`/lab/${post.slug}`}
                target="_blank"
                className="underline decoration-border underline-offset-4 hover:decoration-accent"
              >
                보기
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
