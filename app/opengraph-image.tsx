import { ImageResponse } from "next/og";

export const alt = "Кирил ↔ Лотин Конвертор";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.85, marginBottom: 16 }}>
          Ўзбек ёзуви конвертори
        </div>
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>
          Кирил ↔ Лотин
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 24, maxWidth: 900, textAlign: "center" }}>
          Матн ва .docx файлларни бир зумда ўгиринг
        </div>
      </div>
    ),
    size,
  );
}
