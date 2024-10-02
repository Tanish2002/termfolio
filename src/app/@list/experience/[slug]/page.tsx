import React from "react";

import { readItems } from "@directus/sdk";
import slugify from "slugify";

import BorderBox from "@/components/BorderBox/BorderBox";
import ExperienceList from "@/components/Lists/ExperienceList/ExperienceList";
import client from "@/lib/directus";

export const dynamicParams = false;

export default async function Experience() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "experience" }]}>
			<ExperienceList divIndex={2} />
		</BorderBox>
	);
}

export async function generateStaticParams() {
	const posts = await client.request(
		readItems("Experience", {
			fields: ["Title", "Company"]
		})
	);

	return posts.map((post) => ({
		slug: slugify(`${post.Title} ${post.Company}`)
	}));
}
