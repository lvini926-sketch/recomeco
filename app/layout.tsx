import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RECOMEÇO",
    template: "%s | RECOMEÇO",
  },
  description:
    "Plataforma digital de impacto social para pessoas em reintegração e seus familiares.",
  manifest: "/manifest.json",
  applicationName: "RECOMEÇO",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RECOMEÇO",
  },
  openGraph: {
    title: "RECOMEÇO",
    description:
      "Existe um caminho depois daqui. Informação, orientação e ferramentas para recomeçar.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
