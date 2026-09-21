import "server-only";
import { randomUUID } from "node:crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/studio/types";

// 버킷 이름과 리전은 공개된 이미지 주소에 이미 드러나 있어 비밀이 아니다.
const BUCKET = process.env.S3_BUCKET_NAME ?? "daegom-dev-lab-images";
const REGION = process.env.AWS_REGION ?? "ap-northeast-2";

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
};

// 자격 증명은 SDK 기본 순서(환경 변수 AWS_ACCESS_KEY_ID/SECRET → 인스턴스 역할)로 찾는다.
let client: S3Client | null = null;
function s3() {
  return (client ??= new S3Client({ region: REGION }));
}

export type UploadTicket = {
  url: string;
  fields: Record<string, string>;
  publicUrl: string;
};

/** 브라우저가 S3에 직접 올릴 수 있는 5분짜리 허가증을 만든다. 형식·용량은 S3가 강제한다. */
export async function createUploadTicket(input: {
  postId: string;
  contentType: string;
  size: number;
}): Promise<UploadTicket> {
  if (!ACCEPTED_IMAGE_TYPES.includes(input.contentType)) {
    throw new Error("지원하지 않는 이미지 형식입니다. (PNG, JPEG, GIF, WebP, AVIF)");
  }
  if (input.size < 1 || input.size > MAX_IMAGE_BYTES) {
    throw new Error("이미지는 10MB 이하여야 합니다.");
  }
  if (!/^[a-z0-9]{6,32}$/.test(input.postId)) {
    throw new Error("잘못된 요청입니다.");
  }

  const key = `lab/posts/${input.postId}/${Date.now().toString(36)}-${randomUUID().slice(0, 8)}.${EXTENSIONS[input.contentType]}`;

  const { url, fields } = await createPresignedPost(s3(), {
    Bucket: BUCKET,
    Key: key,
    Conditions: [
      ["content-length-range", 1, MAX_IMAGE_BYTES],
      ["eq", "$Content-Type", input.contentType],
    ],
    Fields: { "Content-Type": input.contentType },
    Expires: 300,
  });

  return { url, fields, publicUrl: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}` };
}
