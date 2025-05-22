import { ImageResponse } from "next/og";

import { formatDistance } from "date-fns";

const tokyoNightColors = {
  background: "#1a1b26",
  foreground: "#c0caf5",
  blue: "#7aa2f7",
  red: "#f7768e",
  cyan: "#7dcfff",
  comment: "#565f89",
  darkBlue: "#3d59a1",
  darkPurple: "#1e2239",
  purple: "#bb9af7"
};

const truncateText = (text: string, maxLength = 50) =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const title = searchParams.get("title");
  const tags = searchParams.get("tags");
  const image = searchParams.get("image");
  const publishedAt = searchParams.get("publishedAt");
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://bakaotaku.dev";

  async function loadFont() {
    const response = await fetch(`${baseUrl}/fonts/scientifica.ttf`);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
    throw new Error("Failed to load font data");
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          backgroundColor: tokyoNightColors.background,
          fontFamily: "scientifica",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Site name top-left */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 40,
            color: tokyoNightColors.red,
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          bakaotaku.dev
        </div>
        {/* Main content area: row if image, column otherwise */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: image ? "row" : "column",
            alignItems: image ? "center" : "center",
            justifyContent: "center",
            width: "100%",
            padding: image ? "0 48px" : "0 48px"
          }}
        >
          {/* Left: Title, tags, date */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: image ? "flex-start" : "center",
              justifyContent: "center",
              paddingRight: image ? "48px" : 0,
              minWidth: 0
            }}
          >
            {/* Type badge */}
            {type && (
              <div
                style={{
                  backgroundColor: tokyoNightColors.blue,
                  color: tokyoNightColors.background,
                  padding: "10px 28px",
                  borderRadius: "18px",
                  fontSize: "26px",
                  marginBottom: "28px",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  alignSelf: image ? "flex-start" : "center"
                }}
              >
                {type}
              </div>
            )}
            {/* Title */}
            <h1
              style={{
                fontSize: "64px",
                color: "#ffb86c",
                margin: "0 0 32px 0",
                lineHeight: 1.1,
                fontWeight: 700,
                textAlign: image ? "left" : "center",
                wordBreak: "break-word"
              }}
            >
              {truncateText(title || "", 60)}
            </h1>
            {/* Tags */}
            {tags && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  margin: "0 0 32px 0",
                  justifyContent: image ? "flex-start" : "center"
                }}
              >
                {tags.split(",").map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: `${tokyoNightColors.darkBlue}40`,
                      color: tokyoNightColors.cyan,
                      padding: "10px 22px",
                      borderRadius: "14px",
                      fontSize: "24px",
                      fontWeight: 600,
                      whiteSpace: "nowrap"
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
            {/* Date */}
            {publishedAt && (
              <div
                style={{
                  fontSize: "24px",
                  color: tokyoNightColors.comment,
                  marginBottom: "18px",
                  textAlign: image ? "left" : "center"
                }}
              >
                {formatDistance(new Date(publishedAt), new Date(), {
                  addSuffix: true
                })}
              </div>
            )}
          </div>
          {/* Right: Optional Header Image */}
          {image && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1
              }}
            >
              <img
                src={image}
                alt="Header image"
                style={{
                  maxWidth: "380px",
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: `2px solid ${tokyoNightColors.darkBlue}`,
                  boxShadow: `0 4px 24px 0 ${tokyoNightColors.darkPurple}80`,
                  background: tokyoNightColors.background
                }}
              />
            </div>
          )}
        </div>
        {/* Footer bar styled like attached image, improved grouping and alignment */}
        <div
          style={{
            width: "100%",
            minHeight: 44,
            borderTop: `2px solid ${tokyoNightColors.blue}`,
            background: `${tokyoNightColors.darkPurple}f2`, // more opaque
            color: tokyoNightColors.comment,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px 0 32px"
          }}
        >
          {/* Left group: key hints */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              fontSize: "22px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            {/* Group 1 */}
            <span style={{ color: tokyoNightColors.red }}>{"<pgUp|pgDown>"}</span>
            <span style={{ color: tokyoNightColors.comment, margin: "0 8px" }}>{":scroll"}</span>
            <span style={{ color: tokyoNightColors.comment, opacity: 0.5, margin: "0 12px" }}>
              |
            </span>
            {/* Group 2 */}
            <span style={{ color: tokyoNightColors.blue }}>{"<left|right>"}</span>
            <span style={{ color: tokyoNightColors.comment, margin: "0 8px" }}>
              {":switch section"}
            </span>
            <span style={{ color: tokyoNightColors.comment, opacity: 0.5, margin: "0 12px" }}>
              |
            </span>
            {/* Group 3 */}
            <span style={{ color: tokyoNightColors.purple }}>{"<up|down>"}</span>
            <span style={{ color: tokyoNightColors.comment, margin: "0 8px" }}>
              {":switch item/scroll"}
            </span>
            <span style={{ color: tokyoNightColors.comment, opacity: 0.5, margin: "0 12px" }}>
              |
            </span>
            {/* Group 4 */}
            <span style={{ color: tokyoNightColors.blue }}>{"<Enter>"}</span>
            <span style={{ color: tokyoNightColors.comment, margin: "0 8px" }}>
              {":select item"}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "scientifica",
          data: await loadFont(),
          style: "normal"
        }
      ]
    }
  );
}

export const config = {
  api: {
    responseType: "buffer"
  }
};
