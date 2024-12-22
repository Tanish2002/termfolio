import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { BaseList } from "../BaseList";
import { BaseListItem } from "../types";

const SocialList: React.FC<{ divIndex: number }> = async ({ divIndex }) => {
	const items = await queryItems();
	return <BaseList divIndex={divIndex} items={items} boxText="socials" />;
};

const queryItems = unstable_cache(
	async () => {
		const { isEnabled: draft } = await draftMode();

		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "socials",
			draft,
			overrideAccess: draft,
			pagination: false
		});
		const transformedItems: BaseListItem[] = result.docs.map((item) => ({
			leftContent: item.name,
			rightContent: { iconName: item.logo_name.trim(), iconFamily: item.logo_family },
			href: item.link
		}));

		return transformedItems;
	},
	["socials-list"],
	{
		tags: ["socials-list"]
	}
);
export default React.memo(SocialList);
