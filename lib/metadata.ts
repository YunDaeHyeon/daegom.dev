import type { Metadata } from "next";

/** 루트의 opengraph-image는 페이지가 openGraph를 직접 정의하는 순간 상속되지 않는다.
 *  페이지별 제목·설명을 쓰면서도 같은 이미지를 유지하기 위해 명시적으로 지정한다. */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "윤대현 · YunDaeHyeon — Mobile App Developer",
};

export function pageMetadata({
  title,
  description,
  type = "website",
}: {
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    openGraph: { type, locale: "ko_KR", title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}
