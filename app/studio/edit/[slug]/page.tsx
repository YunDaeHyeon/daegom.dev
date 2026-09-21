import { notFound, redirect } from "next/navigation";
import { Editor } from "@/components/studio/editor";
import { getLabPostBySlug } from "@/lib/lab";
import { getStudioUser } from "@/lib/studio/session";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ published?: string }>;
}) {
  if (!(await getStudioUser())) redirect("/studio");

  const { slug: rawSlug } = await params;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // 이미 디코딩된 값이면 그대로 쓴다.
  }

  const post = await getLabPostBySlug(slug);
  if (!post) notFound();

  const { published } = await searchParams;

  return (
    <Editor
      key={post.slug}
      mode="edit"
      justPublished={published === "1"}
      initial={{
        slug: post.slug,
        title: post.title,
        type: post.type,
        stack: post.stack,
        date: post.createdAt.slice(0, 10),
        content: post.content,
      }}
    />
  );
}
