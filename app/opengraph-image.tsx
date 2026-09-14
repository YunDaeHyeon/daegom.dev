import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "윤대현 · YunDaeHyeon — iOS 개발자";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "lib/fonts/noto-sans-kr-bold-subset.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1d1d1f",
          color: "#fbfbfd",
          padding: "90px",
          fontFamily: "Noto Sans KR",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#98989d" }}>
          iOS Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.2,
            marginTop: 20,
          }}
        >
          윤대현 · YunDaeHyeon
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#98989d",
            marginTop: 36,
            maxWidth: 900,
          }}
        >
          기기와 사람을 잇는 경험을 만듭니다.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans KR", data: fontData, weight: 700 }],
    }
  );
}
