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
          background: "#0284c7",
          borderRadius: 14,
          color: "#ffffff",
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        KL
      </div>
    ),
    size,
  );
}
