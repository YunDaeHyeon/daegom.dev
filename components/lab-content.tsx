import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// 본문은 원시 HTML을 허용(rehype-raw)하므로, 그대로 두면 <script>나 onerror 같은 코드가
// 공개 페이지와 글 관리 화면에서 실행될 수 있다. 기존 글이 쓰는 태그만 남기고 나머지는 걸러낸다.
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "center", "u", "small"],
};

// Velog's own editor renders bold/italic emphasis leniently, allowing the
// delimiters to sit directly against punctuation (e.g. `즉**, 다른**`).
// Strict CommonMark (what remark/micromark implement) refuses to open
// emphasis there per its flanking-delimiter rule, so the asterisks were
// showing up literally. Converting them to raw strong/em tags here, before
// the markdown parser runs, sidesteps that rule entirely — the pipeline
// already trusts raw HTML (rehype-raw) for Velog's center tags.
function normalizeEmphasis(markdown: string): string {
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((block, i) => {
      if (i % 2 === 1) return block; // fenced code block, leave untouched
      return block
        .split(/(`[^`\n]+`)/g)
        .map((seg, j) => {
          if (j % 2 === 1) return seg; // inline code span, leave untouched
          return seg
            .replace(/\*\*([^\n*]+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^\n*]+?)\*/g, "<em>$1</em>");
        })
        .join("");
    })
    .join("");
}

export function LabContent({ markdown }: { markdown: string }) {
  const normalized = normalizeEmphasis(markdown);
  return (
    <div
      className="mt-8 max-w-[70ch] break-words text-base leading-8 text-foreground sm:text-lg sm:leading-9
        [&_h1]:mt-10 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight
        [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight
        [&_h3]:mt-7 [&_h3]:text-lg [&_h3]:font-semibold
        [&_p]:mt-4
        [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5
        [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5
        [&_li]:mt-1.5
        [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-accent
        [&_strong]:font-semibold [&_strong]:text-foreground
        [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground
        [&_hr]:mt-8 [&_hr]:border-border
        [&_img]:mt-5 [&_img]:rounded-sm [&_img]:border [&_img]:border-border
        [&_code]:rounded-sm [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em]
        [&_pre]:mt-5 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-[0.8em] [&_pre]:leading-6
        [&_pre_code]:bg-transparent [&_pre_code]:p-0
        [&_table]:mt-5 [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-[0.75em]
        [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
        [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}>
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
