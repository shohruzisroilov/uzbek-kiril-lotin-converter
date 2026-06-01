import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "@/components/ToastContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kirillotin.uz";

const onest = Onest({
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

const TITLE = "Kiril Lotin Konvertor — O'zbek matnini o'girish onlayn | Кирил Лотин";
const DESCRIPTION =
  "Kiril lotin konvertor — o'zbek matnini kirildan lotinga yoki lotindan kirilga bepul, tez va aniq o'girish. Matn yoki .txt, .docx faylini yuklang — natijani darhol oling. Кирил Лотин конвертор, transliteratsiya, ўгириш.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Kiril Lotin Konvertor",
  },
  description: DESCRIPTION,
  applicationName: "Kiril Lotin Konvertor",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // Latin (primary — Google ko'proq lotin qidiruvlarini qaytaradi)
    "kiril lotin",
    "kiril lotin konvertor",
    "kiril lotin converter",
    "kiril lotin o'girish",
    "lotin kiril",
    "lotin kirill",
    "kiril lotinga o'girish",
    "lotin kirilga o'girish",
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
    "o'zbek alifbosi konvertor",
    "uzbek alphabet converter",
    "cyrillic to latin uzbek",
    "latin to cyrillic uzbek",
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
  ],
  authors: [{ name: "Shohruzdev", url: "https://t.me/Shohruz_Isroilov" }],
  creator: "Shohruzdev",
  publisher: "Shohruzdev",
  category: "utilities",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "uz": SITE_URL,
      "uz-Cyrl": SITE_URL,
      "uz-Latn": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["uz_Latn_UZ", "ru_RU"],
    url: SITE_URL,
    siteName: "Kiril Lotin Konvertor — kirillotin.uz",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kiril Lotin Konvertor — kirillotin.uz",
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
      name: "Kiril Lotin Konvertor",
      alternateName: ["Кирил Лотин Конвертор", "kirillotin.uz", "Kiril-Lotin"],
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
        "Kiril → Lotin konvertatsiya",
        "Lotin → Kiril konvertatsiya",
        "Кирил → Лотин конвертация",
        "Лотин → Кирил конвертация",
        "Matn kiritish",
        ".txt faylni yuklash va o'girish",
        ".docx faylni yuklash va o'girish",
        "Natijani nusxalash",
        "Natijani yuklab olish",
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
      name: "Kiril Lotin Konvertor",
      alternateName: "Кирил Лотин Конвертор",
      description: DESCRIPTION,
      inLanguage: ["uz-Cyrl", "uz-Latn"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      publisher: {
        "@type": "Person",
        name: "Shohruzdev",
        url: "https://t.me/Shohruz_Isroilov",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Kiril Lotin Konvertor",
      alternateName: "Кирил Лотин Конвертор",
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Kiril lotin konvertatsiya bepulmi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ha, saytdan foydalanish to'liq bepul. Cheklovlar, obuna yoki reklamalar yo'q.",
          },
        },
        {
          "@type": "Question",
          name: "Qanday fayllarni yuklash mumkin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: ".txt va .docx formatidagi fayllarni yuklash mumkin. Faylning maksimal hajmi 5 MB.",
          },
        },
        {
          "@type": "Question",
          name: "Konvertatsiya natijasi serverga yuboriladi yoki saqlanadimi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yo'q, barcha konvertatsiya faqat sizning brauzeringizda amalga oshiriladi. Matn yoki fayl serverga yuborilmaydi, maxfiylik 100% ta'minlangan.",
          },
        },
        {
          "@type": "Question",
          name: "Docx faylining formatlash saqlanadimi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ha, .docx faylni o'girganingizda shrift, rang, shakl, jadvallar va boshqa formatlash elementlari to'liq saqlanib qoladi.",
          },
        },
        {
          "@type": "Question",
          name: "Konvertatsiya qanchalik aniq ishlaydi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Konvertatsiya hozirgi rasmiy o'zbek lotin alifbosi (2019 yil o'zgartirishlari) asosida ishlaydi. Ye/E, apostrof, Ts, X/H kabi nozik holatlar to'g'ri hisobga olingan. Aniqlik 99%dan yuqori.",
          },
        },
        {
          "@type": "Question",
          name: "Qaysi yo'nalishda o'girish kerakligini sayt avtomatik aniqlaydimi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ha, sayt matnni kirilda yoki lotinda ekanligini avtomatik aniqlab, tegishli yo'nalishni tanlaydi. Qo'lda ham almashtirish mumkin.",
          },
        },
        {
          "@type": "Question",
          name: "Ro'yxatdan o'tish kerakmi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yo'q, hech qanday ro'yxatdan o'tish, email yoki telefon raqami kerak emas. Saytga kirish bilanoq ishlatish mumkin.",
          },
        },
        {
          "@type": "Question",
          name: "Mobil telefonida ishlaydi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ha, sayt Android, iPhone va planshetlar uchun to'liq moslashtirilgan. Alohida ilova o'rnatish shart emas — brauzer orqali ishlatiladi.",
          },
        },
        {
          "@type": "Question",
          name: "X va H harflarining farqi nima?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kiril X harfi lotinda X bilan (Xayr → Xayr), H esa H bilan (Havo → Havo) yoziladi. Saytimiz buni avtomatik to'g'ri o'giradi.",
          },
        },
        {
          "@type": "Question",
          name: "Apostrof (') nima uchun ishlatiladi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apostrof O' va G' harflarining bir qismi sifatida (O'zbek) va ma'no farqlaydigan bo'g'in chegarasida (Ma'no) ishlatiladi.",
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
    <html lang="uz" className={onest.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="uz" href={SITE_URL} />
        <link rel="alternate" hrefLang="uz-Cyrl" href={SITE_URL} />
        <link rel="alternate" hrefLang="uz-Latn" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kiril Lotin" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
        {GA_MEASUREMENT_ID && (
          <>
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
          </>
        )}
      </head>
      <body className="font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white antialiased">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Асосий мазмунга ўтиш
        </a>
        <div className="paper-grain" aria-hidden="true" />
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
