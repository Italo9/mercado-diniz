import type { Metadata, Viewport } from "next";
import "./globals.css";
import { market } from "@/lib/config";

export const metadata: Metadata = {
  title: `${market.name} | Qualidade e preço justo`,
  description: `${market.name}: ${market.description}. Consulte preços e disponibilidade dos produtos.`,
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d4111c",
  // Faz o teclado encolher o layout (input e mensagens continuam visíveis no mobile)
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
