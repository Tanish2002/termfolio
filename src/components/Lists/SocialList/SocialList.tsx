import React from "react";

import { readItems } from "@directus/sdk";

import DynamicIcon from "@/components/DynamicIcon";
import client from "@/lib/directus";

import SocialListItemClient from "./SocialListItemClient";
import { SocialListProps } from "./types";

// const items: SocialListItemProps[] = [
// 	{
// 		socialName: "Github",
// 		logo: { type: "fa6", name: "FaGithub" },
// 		href: "https://github.com/Tanish2002"
// 	},
// 	{
// 		socialName: "Email",
// 		logo: { type: "md", name: "MdEmail" },
// 		href: "mailto:tanishkhare@gmail.com"
// 	},
// 	{
// 		socialName: "Twitter/X",
// 		logo: { type: "fa6", name: "FaXTwitter" },
// 		href: "https://twitter.com"
// 	},
// 	{
// 		socialName: "Linkedin",
// 		logo: { type: "fa6", name: "FaLinkedin" },
// 		href: "https://linkedin.com"
// 	}
// ];

const SocialList: React.FC<SocialListProps> = async ({ divIndex }) => {
	const items = await client.request(
		readItems("Socials", {
			fields: ["Name", "Link", "Logo_Name", "Logo_Family"],
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
					<SocialListItemClient
						icon={
							<DynamicIcon
								className="text-inherit"
								icon={item.Logo_Name.trim()}
								iconFamily={item.Logo_Family}
							/>
						}
						key={`social-item-${itemIndex}`}
						divIndex={divIndex}
						socialItem={{ socialName: item.Name.trim(), href: item.Link.trim() }}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(SocialList);
