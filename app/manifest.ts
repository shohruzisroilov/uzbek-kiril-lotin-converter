import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Кирил ↔ Лотин Конвертор",
    short_name: "Кирил ↔ Лотин",
    description:
      "Ўзбек матни ва файлларни Кирил ↔ Лотин ёзувлари ўртасида конвертация қилиш.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    lang: "uz-Cyrl",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
