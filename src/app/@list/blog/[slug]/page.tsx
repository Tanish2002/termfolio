import React from "react";

import { readItems } from "@directus/sdk";

import BorderBox from "@/components/BorderBox/BorderBox";
import BlogList from "@/components/Lists/BlogList/BlogList";
import client from "@/lib/directus";

export default async function Blog({
	searchParams
}: {
	searchParams: Promise<{ status: "published" | "archived" }>;
}) {
	const status = ["published", "archived"].includes((await searchParams).status)
		? (await searchParams).status
		: "published";
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "blog" }]}>
			<BlogList divIndex={2} status={status} />
		</BorderBox>
	);
}

export async function generateStaticParams() {
	const posts = await client.request(
		readItems("Blog", {
			fields: ["slug"]
		})
	);

	return posts.map((post) => ({
		slug: post.slug.trim()
	}));
}
