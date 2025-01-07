import { ImageResponse } from "next/og";

import { formatDistance } from "date-fns";

const tokyoNightColors = {
  background: "#1a1b26",
  foreground: "#c0caf5",
  blue: "#7aa2f7",
  cyan: "#7dcfff",
  comment: "#565f89",
  darkBlue: "#3d59a1",
  darkPurple: "#1e2239"
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
  async function loadGoogleFont(font: string, text: string | number | boolean) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status === 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("Failed to load font data");
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: tokyoNightColors.background,
          padding: "60px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "60%"
          }}
        >
          {type && (
            <div
              style={{
                backgroundColor: tokyoNightColors.blue,
                color: tokyoNightColors.background,
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "20px",
                marginBottom: "20px",
                textTransform: "capitalize",
                fontWeight: 600
              }}
            >
              {type}
            </div>
          )}

          <h1
            style={{
              fontSize: "48px",
              color: tokyoNightColors.foreground,
              margin: "0 0 20px 0",
              lineHeight: 1.2,
              fontWeight: 600
            }}
          >
            {truncateText(title || "", 60)}
          </h1>

          {tags && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px"
              }}
            >
              {tags.split(",").map((tag, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: `${tokyoNightColors.darkBlue}20`,
                    color: tokyoNightColors.cyan,
                    padding: "6px 12px",
                    borderRadius: "15px",
                    fontSize: "18px",
                    whiteSpace: "nowrap"
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {publishedAt && (
            <div
              style={{
                marginTop: "20px",
                fontSize: "20px",
                color: tokyoNightColors.comment
              }}
            >
              {formatDistance(new Date(publishedAt), new Date(), {
                addSuffix: true
              })}
            </div>
          )}
        </div>

        {image && (
          <div
            style={{
              display: "flex",
              width: "35%",
              height: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: `0 10px 30px ${tokyoNightColors.darkPurple}`
            }}
          >
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={image}
              alt="Project Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await loadGoogleFont("Inter", title || "bakaotaku.dev"),
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
