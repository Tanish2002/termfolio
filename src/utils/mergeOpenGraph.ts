import type { Metadata } from "next";

import { getServerSideURL } from "./getURL";

const defaultMetadata = {
  openGraph: {
    type: "website",
    description:
      "An open-source Portfolio built with Payload, Next.js and love ❤",
    images: [
      {
        url: `${getServerSideURL()}/og/About.png`,
      },
    ],
    siteName: "Tanish Khare Portfolio",
    title: "Termfolio | Tanish Khare",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "An open-source Portfolio built with Payload, Next.js and love ❤",
    images: [`${getServerSideURL()}/og/about.png`],
    site: "@baka_otaku2002",
    title: "Termfolio | Tanish Khare",
    creator: "@baka_otaku2002",
  },
};

export const mergeSocialMetadata = ({
  title,
  description,
  image,
  url,
}: {
  title?: string;
  description?: string | null;
  image?: string;
  url?: string;
}): {
  openGraph: Metadata["openGraph"];
  twitter: Metadata["twitter"];
} => {
  const ogImage = image ? [{ url: image }] : defaultMetadata.openGraph.images;

  const twitterImage = image ? [image] : defaultMetadata.twitter.images;

  return {
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultMetadata.openGraph.title,
      description: description || defaultMetadata.openGraph.description,
      images: ogImage,
      url: url || "/",
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter.title,
      description: description || defaultMetadata.twitter.description,
      images: twitterImage,
    },
  };
};
