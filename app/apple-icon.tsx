import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2f8bff 0%, #184a9c 100%)",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <g
            fill="none"
            stroke="#ffffff"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21 L32 36 L45 21" />
            <path d="M32 36 L32 50" />
          </g>
          <g fill="#ffffff">
            <circle cx="19" cy="21" r="6.5" />
            <circle cx="45" cy="21" r="6.5" />
            <circle cx="32" cy="50" r="6.5" />
          </g>
          <circle cx="32" cy="36" r="3.2" fill="#bcdfff" />
        </svg>
      </div>
    ),
    size,
  );
}
