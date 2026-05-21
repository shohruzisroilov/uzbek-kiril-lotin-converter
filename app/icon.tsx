import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0ea5e9",
          borderRadius: 14,
          letterSpacing: -3,
        }}
      >
        <span
          style={{
            fontSize: 42,
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff 0%, #d1fae5 60%, #6ee7b7 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          K
        </span>
        <span
          style={{
            fontSize: 42,
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff 0%, #d1fae5 60%, #6ee7b7 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          L
        </span>
      </div>
    ),
    size,
  );
}
