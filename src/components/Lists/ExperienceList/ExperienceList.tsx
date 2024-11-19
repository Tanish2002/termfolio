import React from "react";

import { readItems } from "@directus/sdk";

import client from "@/lib/directus";

import ExperienceListItemClient from "./ExperienceListItemClient";
import { ExperienceListProps } from "./types";

// const items = [
// 	{
// 		jobTitle: "Software Engineer",
// 		companyName: "company",
// 		slug: "sde-company1"
// 	},
// 	{
// 		jobTitle: "Backend Developer",
// 		companyName: "company",
// 		slug: "sde-company2"
// 	},
// 	{
// 		jobTitle: "Open Source Contributer",
// 		companyName: "Github",
// 		slug: "slug-company3"
// 	}
// ];

const ExperienceList: React.FC<ExperienceListProps> = async ({ divIndex }) => {
	const items = await client.request(
		readItems("Experience", {
			fields: ["Title", "Company", "slug"],
			filter: {
				status: {
					_eq: "enabled"
				}
			}
		})
	);
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => {
				return (
					<ExperienceListItemClient
						key={`experience-item-${itemIndex}`}
						divIndex={divIndex}
						experienceItem={{
							jobTitle: item.Title.trim(),
							companyName: item.Company.trim(),
							slug: "/experience/" + item.slug.trim()
						}}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(ExperienceList);
