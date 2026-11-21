import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WWK FAST — Логистика. Скорость. Надёжность.",
  description: "Международные грузоперевозки Европа — Россия. Любой груз. Гарантии. Скорость.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
