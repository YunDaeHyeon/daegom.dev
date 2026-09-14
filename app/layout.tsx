import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "윤대현 · YunDaeHyeon — iOS 개발자",
  description: "기기와 사람을 잇는 경험을 만드는 iOS 개발자 윤대현의 포트폴리오.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Nav />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border">
          <div className="mx-auto w-full max-w-[1200px] px-6 py-8 text-sm text-muted-foreground sm:px-8">
            © {new Date().getFullYear()} 윤대현
          </div>
        </footer>
      </body>
    </html>
  );
}
