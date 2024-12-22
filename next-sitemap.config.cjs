const SITE_URL =
	process.env.NEXT_PUBLIC_SERVER_URL ||
	process.env.VERCEL_PROJECT_PRODUCTION_URL ||
	"https://termfolio.bakaotaku.dev";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	exclude: [
		"/blog-sitemap.xml",
		"/experience-sitemap.xml",
		"/projects-sitemap.xml",
		"/*",
		"/posts/*"
	],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/api/og/*"
			},
			{
				userAgent: "*",
				disallow: "/admin/*"
			}
		],
		additionalSitemaps: [
			`${SITE_URL}/static-sitemap.xml`,
			`${SITE_URL}/blog-sitemap.xml`,
			`${SITE_URL}/projects-sitemap.xml`,
			`${SITE_URL}/experience-sitemap.xml`
		]
	}
};
