import { ImageResponse } from "next/og"

export const alt = "Muhammad Asif Mohtesham — Founder, Engineer, Consultant"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0d12",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 36,
            background: "linear-gradient(135deg, #6c3de8, #e83d9a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-4px",
            }}
          >
            MAM
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            Muhammad Asif Mohtesham
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#888888",
              letterSpacing: "6px",
            }}
          >
            FOUNDER · ENGINEER · CONSULTANT
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg, #6c3de8, #e83d9a)",
            borderRadius: 999,
            padding: "14px 36px",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "1px",
            }}
          >
            mohtesham.com →
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
