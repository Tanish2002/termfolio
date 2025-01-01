import type { MetadataRoute } from "next";

import { getCurrentTheme } from "@/lib/userSettings/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const theme = await getCurrentTheme();
  const themeColor = theme.resolvedTheme === "dark" ? "#1a1b26" : "#e6e9ef";

  return {
    name: "Termfolio | bakaotaku.dev",
    short_name: "Termfolio",
    description:
      "Welcome to my personal space! Learn more about me, explore the technologies I'm skilled in, and discover the tools I use to build impactful projects.",
    start_url: "/",
    display: "standalone",
    background_color: themeColor,
    theme_color: themeColor,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon"
      },
      {
        src: "/icon1.png",
        sizes: "32x32",
        type: "image/x-icon"
      },
      {
        src: "/icon2.png",
        sizes: "16x16",
        type: "image/x-icon"
      },
      {
        src: "/icon3.png",
        sizes: "192x192",
        type: "image/x-icon"
      },
      {
        src: "/icon4.png",
        sizes: "512x512",
        type: "image/x-icon"
      }
    ]
  };
}
