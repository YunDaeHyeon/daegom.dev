import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "글 관리",
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <main className="py-10 sm:py-14">
      <Container>{children}</Container>
    </main>
  );
}
