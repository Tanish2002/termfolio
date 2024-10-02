import React from "react";

import { readItems } from "@directus/sdk";

import DynamicIcon from "@/components/DynamicIcon";
import client from "@/lib/directus";

import TechStackListItemClient from "./TechStackListItemClient";
import { TechStackListItemProps, TechStackListProps } from "./types";

// const items: TechStackListItemProps[] = [
// 	{ item: "Golang", logo: { type: "fa6", name: "FaGolang" }, slug: "test.com" },
// 	{ item: "Rust", logo: { type: "fa6", name: "FaRust" }, slug: "test.com" },
// 	{ item: "Python", logo: { type: "fa6", name: "FaPython" }, slug: "test.com" },
// 	{
// 		item: "Javascript",
// 		logo: { type: "io5", name: "IoLogoJavascript" },
// 		slug: "test.com"
// 	},
// 	{ item: "React", logo: { type: "fa6", name: "FaReact" }, slug: "test.com" },
// 	{
// 		item: "Next.Js",
// 		logo: { type: "ri", name: "RiNextjsFill" },
// 		slug: "test.com"
// 	},
// 	{ item: "Vue", logo: { type: "ri", name: "RiVuejsFill" }, slug: "test.com" },
// 	{
// 		item: "GraphQL",
// 		logo: { type: "si", name: "SiGraphql" },
// 		slug: "test.com"
// 	},
// 	{ item: "Docker", logo: { type: "si", name: "SiDocker" }, slug: "test.com" },
// 	{
// 		item: "MySQL",
// 		logo: { type: "pi", name: "PiFileSqlFill" },
// 		slug: "test.com"
// 	},
// 	{
// 		item: "MongoDB",
// 		logo: { type: "si", name: "SiMongodb" },
// 		slug: "test.com"
// 	},
// 	{
// 		item: "PostgreSQL",
// 		logo: { type: "bi", name: "BiLogoPostgresql" },
// 		slug: "test.com"
// 	},
// 	{ item: "Git", logo: { type: "fa6", name: "FaGit" }, slug: "test.com" },
// 	{
// 		item: "Automated Testing",
// 		logo: { type: "pi", name: "PiTestTubeFill" },
// 		slug: "test.com"
// 	},
// 	{ item: "Bash", logo: { type: "si", name: "SiGnubash" }, slug: "test.com" },
// 	{ item: "Linux", logo: { type: "si", name: "SiLinux" }, slug: "test.com" },
// 	{ item: "Neovim", logo: { type: "si", name: "SiNeovim" }, slug: "test.com" }
// ];

const TechStackList: React.FC<TechStackListProps> = async ({ divIndex }) => {
	const items = await client.request(
		readItems("TechStack", {
			fields: ["Name", "Logo_Name", "Logo_Family"]
		})
	);
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => {
				return (
					<TechStackListItemClient
						icon={
							<DynamicIcon
								className="text-inherit"
								icon={item.Logo_Name}
								iconFamily={item.Logo_Family}
							/>
						}
						key={`experience-item-${itemIndex}`}
						divIndex={divIndex}
						techStackItem={{ item: item.Name }}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(TechStackList);
