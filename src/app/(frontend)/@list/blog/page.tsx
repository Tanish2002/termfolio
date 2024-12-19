import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { BaseList } from "@/components/Lists/BaseList";

export const dynamic = "force-static";

async function Blog({
	searchParams
}: {
	searchParams: Promise<{ status: "published" | "archived" }>;
}) {
	const status = ["published", "archived"].includes((await searchParams).status)
		? (await searchParams).status
		: "published";
	const items = await queryItems(status);
	return (
		<BaseList
			divIndex={2}
			items={items}
			boxText={status === "archived" ? "blog - [archived]" : "blog"}
		/>
	);
}

const queryItems = unstable_cache(
	async (status: "published" | "archived") => {
		const { isEnabled: draft } = await draftMode();

		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "posts",
			draft,
			overrideAccess: draft,
			pagination: false,
			select: {
				title: true,
				readTime: true,
				slug: true
			},
			sort: ["-publishedAt"],
			where: {
				_status: {
					equals: "published"
				},
				archived: {
					equals: status === "archived" ? true : false
				}
			}
		});
		const transformedItems = result.docs.map((item) => ({
			leftContent: item.title.trim(),
			rightContent: `${item.readTime} min`,
			href: "/blog/" + item.slug?.trim()
		}));
		return transformedItems;
	},
	["blog-list"],
	{ tags: ["blog-list"] }
);

export default Blog;
