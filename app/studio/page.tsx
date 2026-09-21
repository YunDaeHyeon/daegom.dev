import Link from "next/link";
import { PostList } from "@/components/studio/post-list";
import { StudioLogin } from "@/components/studio/login";
import { SignOutButton } from "@/components/studio/sign-out";
import { getAllLabPostsFresh } from "@/lib/lab";
import { getStudioUser } from "@/lib/studio/session";

export default async function StudioHome() {
  const user = await getStudioUser();
  if (!user) return <StudioLogin />;

  const posts = await getAllLabPostsFresh();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">글 관리</h1>
        <div className="flex items-center gap-5">
          <SignOutButton />
          <Link
            href="/studio/new"
            className="rounded-sm bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
          >
            새 글 쓰기
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <PostList
          posts={posts.map(({ slug, title, type, createdAt, source }) => ({
            slug,
            title,
            type,
            createdAt,
            source,
          }))}
        />
      </div>
    </div>
  );
}
