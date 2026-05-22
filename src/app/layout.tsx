import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "藤電カフェ — ふじ電カフェ | 昭和の記憶、現代の味",
  description:
    "雨の夜に、温かい一杯を。昭和三十二年創業、東京浅草の喫茶店。昭和の温もりと現代の洗練が出会う特別な空間。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="antialiased"
    >
      <body
        style={{ backgroundColor: "var(--coal)", color: "var(--white)" }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
