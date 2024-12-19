import type { Metadata } from "next";

import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description: "An open-source website built with Payload and Next.js.",
	images: [
		// TODO: change this image!!!!
		{
			url: `${getServerSideURL()}/website-template-OG.webp`
		}
	],
	siteName: "Tanish Khare Portfolio",
	title: "Termfolio | Tanish Khare"
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images
	};
};