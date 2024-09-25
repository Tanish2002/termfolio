import React from "react";

import DynamicIcon from "@/components/DynamicIcon";

import SocialListItemClient from "./SocialListItemClient";
import { SocialListItemProps, SocialListProps } from "./types";

const items: SocialListItemProps[] = [
	{
		socialName: "Github",
		logo: { type: "fa6", name: "FaGithub" },
		href: "https://github.com/Tanish2002"
	},
	{
		socialName: "Email",
		logo: { type: "md", name: "MdEmail" },
		href: "mailto:tanishkhare@gmail.com"
	},
	{
		socialName: "Twitter/X",
		logo: { type: "fa6", name: "FaXTwitter" },
		href: "https://twitter.com"
	},
	{
		socialName: "Linkedin",
		logo: { type: "fa6", name: "FaLinkedin" },
		href: "https://linkedin.com"
	}
];

const SocialList: React.FC<SocialListProps> = async ({ divIndex }) => {
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => {
				return (
					<SocialListItemClient
						icon={
							<DynamicIcon
								className="text-inherit"
								icon={item.logo.name}
								iconFamily={item.logo.type}
							/>
						}
						key={`social-item-${itemIndex}`}
						divIndex={divIndex}
						socialItem={item}
						itemIndex={itemIndex}
					/>
				);
			})}
		</ul>
	);
};

export default React.memo(SocialList);
