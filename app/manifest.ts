import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Кирил ↔ Лотин Конвертор",
    short_name: "Кирил ↔ Лотин",
    description:
      "Ўзбек матни ва файлларни Кирил ва Лотин ёзувлари ўртасида тез, аниқ ва бепул конвертация қилиш.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0ea5e9",
    lang: "uz-Cyrl",
    dir: "ltr",
    categories: ["utilities", "productivity", "education"],
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
