import React from "react";

import ExperienceListItemClient from "./ExperienceListItemClient";
import { ExperienceListProps } from "./types";

const items = [
	{
		jobTitle: "Software Engineer",
		companyName: "company",
		slug: "sde-company1"
	},
	{
		jobTitle: "Backend Developer",
		companyName: "company",
		slug: "sde-company2"
	},
	{
		jobTitle: "Open Source Contributer",
		companyName: "Github",
		slug: "slug-company3"
	}
];

const ExperienceList: React.FC<ExperienceListProps> = async ({ divIndex }) => {
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => {
				return (
					<ExperienceListItemClient
						key={`experience-item-${itemIndex}`}
						divIndex={divIndex}
						experienceItem={{ ...item, slug: `/experience/${item.slug}` }}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(ExperienceList);
