import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

// Serifada, humana e calorosa — usada só em títulos, para contrastar
// com a frieza institucional que o tema carrega por natureza.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600"],
  display: "swap",
});

// Humanista, legível, amigável em telas pequenas — usada no corpo todo.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RECOMEÇO",
  description:
    "Apoio prático para famílias de pessoas privadas de liberdade e para quem está construindo a vida após o cárcere.",
  manifest: "/manifest.json",
  applicationName: "RECOMEÇO",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RECOMEÇO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0E3A41",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-areia-50 font-sans text-carvao-900 antialiased">
        {/* Container mobile-first: conteúdo nunca ultrapassa a largura
           confortável de leitura, mesmo em telas maiores. */}
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
