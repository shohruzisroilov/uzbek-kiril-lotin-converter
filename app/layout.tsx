import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kiril-lotin.uz";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Кирил ↔ Лотин Конвертор | Ўзбек Ёзуви",
  description:
    "Ўзбек матни ва файлларни Кирил ↔ Лотин ёзувлари ўртасида тез ва осон конвертация қилинг. Матн киритинг ёки файл юкланг ва натижани дарҳол олинг.",
  keywords: [
    "кирил лотин конвертор",
    "ўзбек конвертор",
    "кирил",
    "лотин",
    "матн",
    "файл",
    "docx",
    "txt",
    "транслитерация",
    "ёзув ўгириш",
  ],
  authors: [{ name: "Кирил Лотин Конвертор" }],
  alternates: {
    canonical: "/",
    languages: {
      "uz-Cyrl": "/",
    },
  },
  openGraph: {
    title: "Кирил ↔ Лотин Конвертор",
    description:
      "Ўзбек матни ва файлларни Кирил ва Лотин ёзувлари ўртасида осон ва тез конвертация қилинг.",
    type: "website",
    locale: "uz",
    url: SITE_URL,
    siteName: "Кирил ↔ Лотин Конвертор",
  },
  twitter: {
    card: "summary_large_image",
    title: "Кирил ↔ Лотин Конвертор",
    description: "Ўзбек матни ва файлларни Кирил ↔ Лотин ёзувлари ўртасида тез конвертация қилинг.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz-Cyrl" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white antialiased">
        <ThemeProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
