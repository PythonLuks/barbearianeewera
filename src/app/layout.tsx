import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";

const coolvetica = localFont({
  src: "../../public/fonts/coolvetica-rg.otf",
  variable: "--font-coolvetica",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neew Era Barbershop | Corte, barba e estilo",
  description: "Corte, barba e estilo com técnica, precisão e personalidade. Mais que um serviço, é sobre se sentir no seu melhor.",
  openGraph: {
    title: "Neew Era Barbershop | Corte, barba e estilo",
    description: "Corte, barba e estilo com técnica, precisão e personalidade.",
    url: "https://neewera.com.br", // Placeholder
    siteName: "Neew Era Barbershop",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${coolvetica.variable} ${bodoni.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
