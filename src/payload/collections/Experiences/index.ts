import {
	MetaDescriptionField,
	MetaTitleField,
	OverviewField,
	PreviewField
} from "@payloadcms/plugin-seo/fields";
import {
	BlockquoteFeature,
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineCodeFeature,
	InlineToolbarFeature,
	OrderedListFeature,
	StrikethroughFeature,
	UnorderedListFeature,
	lexicalEditor
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { authenticatedOrPublished } from "@/payload/access/authenticatedOrPublished";
import { isAdmin } from "@/payload/access/isAdmin";
import { Banner } from "@/payload/blocks/Banner/config";
import { Code } from "@/payload/blocks/Code/config";
import { MediaBlock } from "@/payload/blocks/MediaBlock/config";
import { slugField } from "@/payload/fields/slug";
import { generatePreviewPath } from "@/utils/generatePreviewPath";
import { getServerSideURL } from "@/utils/getURL";

import { revalidateDelete, revalidateExperience } from "./hooks/revalidateExperience";

export const Experiences: CollectionConfig<"experiences"> = {
	slug: "experiences",
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: authenticatedOrPublished,
		update: isAdmin
	},
	// This config controls what's populated by default when a post is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
	defaultPopulate: {
		title: true,
		slug: true,
		meta: {
			title: true,
			description: true
		}
	},
	admin: {
		defaultColumns: ["company", "slug"],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "experiences"
				});

				return `${getServerSideURL()}${path}`;
			}
		},
		preview: (data) => {
			const path = generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "experiences"
			});

			return `${getServerSideURL()}${path}`;
		},
		useAsTitle: "title"
	},
	fields: [
		{
			name: "title",
			label: "Job Title",
			type: "text",
			required: true
		},
		{
			name: "company",
			label: "Company Name",
			type: "text",
			required: true
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "content",
							type: "richText",
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
										BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature(),
										StrikethroughFeature(),
										InlineCodeFeature(),
										UnorderedListFeature(),
										OrderedListFeature(),
										BlockquoteFeature()
									];
								}
							}),
							label: false,
							required: true
						}
					],
					label: "Content"
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description"
						}),
						MetaTitleField({
							hasGenerateFn: true
						}),
						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description"
						})
					]
				}
			]
		},
		{
			type: "row",
			admin: {
				position: "sidebar"
			},
			fields: [
				{
					name: "startDate",
					type: "date",
					required: true,
					admin: {
						date: {
							pickerAppearance: "monthOnly"
						}
					}
				},
				{
					name: "endDate",
					required: true,
					type: "date",
					admin: {
						date: {
							pickerAppearance: "monthOnly"
						}
					}
				}
			]
		},
		...slugField(["title", "company"]) // use title and company to create slug
	],
	hooks: {
		afterChange: [revalidateExperience],
		afterDelete: [revalidateDelete]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100 // We set this interval for optimal live preview
			}
		},
		maxPerDoc: 10
	}
};
