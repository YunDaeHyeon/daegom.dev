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
  title: "daegom — iOS Developer",
  description: "Personal portfolio: work, decisions, and writing from an iOS developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full snap-y snap-proximity antialiased motion-reduce:snap-none`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Nav />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border">
          <div className="mx-auto w-full max-w-[1200px] px-6 py-8 text-sm text-muted-foreground sm:px-8">
            © {new Date().getFullYear()} daegom
          </div>
        </footer>
      </body>
    </html>
  );
}
