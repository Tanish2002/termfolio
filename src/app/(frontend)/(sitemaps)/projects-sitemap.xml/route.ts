import { unstable_cache } from "next/cache";

import config from "@payload-config";
import { getServerSideSitemap } from "next-sitemap";
import { getPayload } from "payload";

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "https://bakaotaku.dev";

    const results = await payload.find({
      collection: "projects",
      overrideAccess: false,
      draft: false,
      depth: 0,
      pagination: false,
      where: {
        _status: {
          equals: "published",
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const dateFallback = new Date().toISOString();

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/projects`,
        lastmod: dateFallback,
      },
    ];

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: `${SITE_URL}/projects/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            };
          })
      : [];

    return [...defaultSitemap, ...sitemap];
  },
  ["projects-sitemap"],
  {
    tags: ["projects-sitemap"],
  },
);

export async function GET() {
  const sitemap = await getPagesSitemap();

  return getServerSideSitemap(sitemap);
}
