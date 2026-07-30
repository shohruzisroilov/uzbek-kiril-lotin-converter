import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kiril ↔ Lotin Konvertor",
    short_name: "Kiril ↔ Lotin",
    description:
      "O'zbek matni va Word (.docx) / .txt fayllarini Kiril va Lotin yozuvlari o'rtasida tez, aniq va oflayn konvertatsiya qilish.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    lang: "uz",
    dir: "ltr",
    categories: ["utilities", "productivity", "education"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
