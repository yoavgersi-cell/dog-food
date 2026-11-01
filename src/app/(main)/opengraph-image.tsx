import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dog Food Scout - Best Fresh & Raw Dog Food 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#A16207",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#191919",
            }}
          >
            +
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#191919",
            }}
          >
            dogfoodscout.com
          </span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#191919",
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          Best Fresh &amp; Raw Dog Food 2026
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#713F12",
            lineHeight: 1.5,
          }}
        >
          7 brands compared on dry-matter nutrition, cost per day and AAFCO data.
        </div>
      </div>
    ),
    { ...size }
  );
}
