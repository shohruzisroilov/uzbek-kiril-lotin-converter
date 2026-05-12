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
          background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
          color: "white",
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: -1,
          borderRadius: 12,
        }}
      >
        К↔Л
      </div>
    ),
    size,
  );
}
