import { Victor_Mono } from "next/font/google";
import localFont from "next/font/local";

import { CollectionSlug } from "payload";

export const scientifica = localFont({
  src: [
    {
      path: "../public/fonts/scientifica.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/scientificaItalic.ttf",
      weight: "400",
      style: "italic"
    },
    {
      path: "../public/fonts/scientificaBold.ttf",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-scientifica",
  adjustFontFallback: "Times New Roman"
});

// TODO: get opinion on this later
// export const scientifica = VT323({
//   subsets: ["latin"],
//   variable: "--font-scientifica",
//   adjustFontFallback: true,
//   weight: ["400"]
// });

export const mono = Victor_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  adjustFontFallback: true
});

export const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: "/blog",
  projects: "/projects",
  experiences: "/experience",
  techstacks: "/"
} as const;
