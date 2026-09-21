/** 제목에서 글 주소를 만든다. 서버와 브라우저가 같은 규칙을 쓴다. */
export function slugify(title: string): string {
  return title
    .trim()
    .normalize("NFC")
    .replace(/[\/\\?#%\[\]]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

/** Firestore 문서 ID로 쓸 수 없는 값을 거른다. */
export function isUsableSlug(slug: string): boolean {
  return slug.length > 0 && !/^\.+$/.test(slug) && !/^__.*__$/.test(slug);
}
