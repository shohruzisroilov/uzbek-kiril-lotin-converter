import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "@/components/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

const GA_MEASUREMENT_ID = "G-H86QF6QEG5";

const SITE_URL = "https://kirillotin.uz";

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
  width: "device-width",
  initialScale: 1,
};

const TITLE = "Кирил ↔ Лотин Конвертор — Ўзбек матнини ўгириш онлайн";
const DESCRIPTION =
  "Ўзбек матни ва файлларни Кирил ва Лотин ёзувлари ўртасида бепул, тез ва аниқ конвертация қилиш. Матн ёки .txt, .docx файлини юкланг — натижани дарҳол олинг. Kiril Lotin tarjimon, transliteratsiya, ўгириш.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Кирил ↔ Лотин Конвертор",
  },
  description: DESCRIPTION,
  applicationName: "Кирил ↔ Лотин Конвертор",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // Cyrillic
    "кирил лотин",
    "кирил лотин конвертор",
    "ўзбек кирил лотин",
    "лотин кирил",
    "кирилл лотин ўгириш",
    "ўзбек матн ўгириш",
    "ўзбек ёзуви конвертор",
    "матн ўгириш",
    "файл ўгириш",
    "docx конвертор",
    "txt конвертор",
    "транслитерация",
    "ёзув ўгириш онлайн",
    // Latin
    "kiril lotin",
    "kiril lotin converter",
    "kiril lotin o'girish",
    "lotin kiril",
    "lotin kirill",
    "kiril lotinga",
    "lotin kirilga",
    "o'zbek kiril lotin",
    "uzbek cyrillic latin",
    "uzbek transliteration",
    "kiril lotin tarjimon",
    "kiril yozuvini lotinga",
    "lotin yozuvini kirilga",
    "matn o'girish",
    "fayl o'girish",
    "docx o'girish",
    "uzbek converter online",
    "kirilotin",
    "kirillotin",
    "kiril-lotin",
  ],
  authors: [{ name: "Shohruzdev", url: "https://t.me/Shohruz_Isroilov" }],
  creator: "Shohruzdev",
  publisher: "Shohruzdev",
  category: "utilities",
  alternates: {
    canonical: "/",
    languages: {
      "uz-Cyrl": "/",
      "uz-Latn": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["uz_Latn_UZ", "ru_RU"],
    url: SITE_URL,
    siteName: "Кирил ↔ Лотин Конвертор",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Кирил ↔ Лотин Конвертор",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "Кирил ↔ Лотин Конвертор",
      url: SITE_URL,
      description: DESCRIPTION,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      inLanguage: ["uz-Cyrl", "uz-Latn"],
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "UZS",
      },
      featureList: [
        "Кирил → Лотин конвертация",
        "Лотин → Кирил конвертация",
        "Матн киритиш",
        ".txt файлни юклаш ва ўгириш",
        ".docx файлни юклаш ва ўгириш",
        "Натижани нусхалаш",
        "Натижани юклаб олиш",
      ],
      author: {
        "@type": "Person",
        name: "Shohruzdev",
        url: "https://t.me/Shohruz_Isroilov",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Кирил ↔ Лотин Конвертор",
      description: DESCRIPTION,
      inLanguage: "uz-Cyrl",
      publisher: {
        "@type": "Person",
        name: "Shohruzdev",
        url: "https://t.me/Shohruz_Isroilov",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Кирил ↔ Лотин Конвертор",
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Кирил ↔ Лотин конвертация бепулми?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ҳа, сайтдан фойдаланиш тўлиқ бепул. Чекловлар йўқ.",
          },
        },
        {
          "@type": "Question",
          name: "Қандай файлларни юклаш мумкин?",
          acceptedAnswer: {
            "@type": "Answer",
            text: ".txt ва .docx форматидаги файлларни юклаш мумкин. Файл максимал 5 МБ бўлиши керак.",
          },
        },
        {
          "@type": "Question",
          name: "Конвертация натижаси сақланадими?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Йўқ, барча конвертация фақат сизнинг браузерингизда амалга оширилади. Матн серверга юборилмайди.",
          },
        },
        {
          "@type": "Question",
          name: "Docx файлининг форматланиши сақланадими?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ҳа, .docx файлни ўгирганингизда шрифт, рангу шакл ва бошқа форматлаш элементлари сақланиб қолади.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz-Cyrl" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="uz-Cyrl" href={SITE_URL} />
        <link rel="alternate" hrefLang="uz-Latn" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Кирил ↔ Лотин" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
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
