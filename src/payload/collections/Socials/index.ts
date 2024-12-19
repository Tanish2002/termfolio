import type { CollectionConfig } from "payload";

import { anyone } from "@/access/anyone";
import { SUPPORTED_FAMILIES } from "@/components/DynamicIcon";
import { isAdmin } from "@/payload/access/isAdmin";
import { generatePreviewPath } from "@/utils/generatePreviewPath";
import { getServerSideURL } from "@/utils/getURL";

import { revalidateDelete, revalidateSocials } from "./hooks/revalidateSocials";

export const Socials: CollectionConfig<"socials"> = {
	slug: "socials",
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: anyone,
		update: isAdmin
	},
	// This config controls what's populated by default when a post is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
	defaultPopulate: {
		name: true,
		link: true,
		enabled: true,
		logo_name: true,
		logo_family: true
	},
	admin: {
		defaultColumns: ["name", "logo_family", "logo_name", "enabled"],
		livePreview: {
			url: () => {
				const path = generatePreviewPath({
					slug: "",
					collection: "socials"
				});

				return `${getServerSideURL()}${path}`;
			}
		},
		preview: () => {
			const path = generatePreviewPath({
				slug: "",
				collection: "socials"
			});

			return `${getServerSideURL()}${path}`;
		},
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			label: "Name",
			type: "text",
			required: true
		},
		{
			name: "link",
			label: "Link",
			type: "text",
			required: true
		},
		{
			name: "enabled",
			label: "Enabled",
			defaultValue: true,
			type: "checkbox",
			admin: {
				position: "sidebar",
				components: {
					Cell: "/payload/fields/checkbox.tsx#default"
				}
			}
		},
		{
			type: "row",
			fields: [
				{
					name: "logo_family",
					label: "Logo Family",
					type: "select",
					defaultValue: SUPPORTED_FAMILIES[0],
					options: SUPPORTED_FAMILIES.map((family) => ({
						label: family,
						value: family
					})),
					required: true
				},
				{
					name: "logo_name",
					label: "Logo Name",
					type: "text",
					required: true
				}
			]
		}
	],
	hooks: {
		afterChange: [revalidateSocials],
		afterDelete: [revalidateDelete]
	}
};
