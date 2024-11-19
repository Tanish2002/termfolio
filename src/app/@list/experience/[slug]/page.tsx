import React from "react";

import { readItems } from "@directus/sdk";

import BorderBox from "@/components/BorderBox/BorderBox";
import ExperienceList from "@/components/Lists/ExperienceList/ExperienceList";
import client from "@/lib/directus";

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
			fields: ["slug"]
		})
	);

	return posts.map((post) => ({
		slug: post.slug.trim()
	}));
}
