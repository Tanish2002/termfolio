import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { BaseList } from "@/components/Lists/BaseList";
import { BaseListItem } from "@/components/Lists/types";

export const dynamic = "force-static";

export default React.memo(async function TechStack() {
	const items = await queryItems();
	return <BaseList divIndex={2} items={items} boxText="techstack" />;
});

const queryItems = unstable_cache(
	async () => {
		const { isEnabled: draft } = await draftMode();

		const payload = await getPayload({ config: configPromise });

		const result = await payload.find({
			collection: "techstacks",
			draft,
			overrideAccess: draft,
			pagination: false,
			sort: ["id"]
		});
		const transformedItems: BaseListItem[] = result.docs.map((item) => ({
			leftContent: item.name.trim(),
			rightContent: { iconName: item.logo_name.trim(), iconFamily: item.logo_family }
		}));

		return transformedItems;
	},
	["techstack-list"],
	{
		tags: ["techstack-list"]
	}
);
