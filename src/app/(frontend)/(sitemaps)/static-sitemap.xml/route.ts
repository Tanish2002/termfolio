import { getServerSideSitemap } from "next-sitemap";

const getPagesSitemap = async () => {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://bakaotaku.dev";

  const dateFallback = new Date().toISOString();

  const defaultSitemap = [
    {
      loc: `${SITE_URL}/`,
      lastmod: dateFallback
    },
    {
      loc: `${SITE_URL}/settings/font`,
      lastmod: dateFallback
    },
    {
      loc: `${SITE_URL}/settings/theme`,
      lastmod: dateFallback
    }
  ];

  return [...defaultSitemap];
};

export async function GET() {
  const sitemap = await getPagesSitemap();

  return getServerSideSitemap(sitemap);
}
