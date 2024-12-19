import type { Metadata } from "next";

import type { Experience, Post, Project } from "../payload-types";
import { mergeOpenGraph } from "./mergeOpenGraph";
import { generateOgImageUrl } from "./og-image";

export const generateMeta = async (args: {
	doc: Partial<Project> | Partial<Post> | Partial<Experience>;
	type: "projects" | "posts" | "experience";
}): Promise<Metadata> => {
	const { doc, type } = args || {};

	const ogImage = generateOgImageUrl(doc, type);

	const title = doc?.meta?.title ? doc?.meta?.title : "Termfolio | bakaotaku.dev";

	return {
		description: doc?.meta?.description,
		openGraph: mergeOpenGraph({
			description: doc?.meta?.description || "",
			images: ogImage
				? [
						{
							url: ogImage
						}
					]
				: undefined,
			title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/"
		}),
		title
	};
};
