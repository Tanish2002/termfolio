import React from "react";

import { readItems } from "@directus/sdk";

import client from "@/lib/directus";

import BlogListItemClient from "./BlogListItemClient";
import { BlogListProps } from "./types";

const BlogList: React.FC<BlogListProps> = async ({ divIndex, status }) => {
	const items = await client.request(
		readItems("Blog", {
			fields: ["title", "read_time", "slug"],
			filter: {
				status: {
					_eq: status
				}
			},
			sort: ["-date_created"] // Sort by most recent first
		})
	);

	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => {
				return (
					<BlogListItemClient
						key={`blog-item-${itemIndex}`}
						divIndex={divIndex}
						blogItem={{
							title: item.title.trim(),
							readTime: `${item.read_time} min`,
							slug: "/blog/" + item.slug.trim()
						}}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(BlogList);
