"use server";

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getPublishedPosts = unstable_cache(
	async () => {
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
				slug: true,
				archived: true
			},
			sort: ["-publishedAt"],
			where: {
				_status: {
					equals: "published"
				},
				archived: {
					equals: false
				}
			}
		});

		return result.docs.map((item) => ({
			leftContent: item.title.trim(),
			rightContent: `${item.readTime} min`,
			href: "/blog/" + item.slug?.trim()
		}));
	},
	["blog-published-list"],
	{ tags: ["blog-archived-list"] }
);

export const getArchivedPosts = unstable_cache(
	async () => {
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
				slug: true,
				archived: true
			},
			sort: ["-publishedAt"],
			where: {
				_status: {
					equals: "published"
				},
				archived: {
					equals: true
				}
			}
		});

		return result.docs.map((item) => ({
			leftContent: item.title.trim(),
			rightContent: `${item.readTime} min`,
			href: "/blog/" + item.slug?.trim() + "?status=archived"
		}));
	},
	["blog-archived-list"],
	{ tags: ["blog-archived-list"] }
);
