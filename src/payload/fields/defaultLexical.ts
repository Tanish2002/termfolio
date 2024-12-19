import {
	BlockquoteFeature,
	BoldFeature,
	IndentFeature,
	InlineCodeFeature,
	ItalicFeature,
	LinkFeature,
	OrderedListFeature,
	ParagraphFeature,
	StrikethroughFeature,
	UnderlineFeature,
	UnorderedListFeature,
	lexicalEditor
} from "@payloadcms/richtext-lexical";
import { Config } from "payload";

import { ColorTextFeature } from "../features/colorText/server";

export const defaultLexical: Config["editor"] = lexicalEditor({
	features: () => {
		return [
			ParagraphFeature(),
			UnderlineFeature(),
			BoldFeature(),
			ItalicFeature(),
			StrikethroughFeature(),
			InlineCodeFeature(),
			UnorderedListFeature(),
			OrderedListFeature(),
			BlockquoteFeature(),
			IndentFeature(),
			LinkFeature({
				enabledCollections: ["posts"],
				fields: ({ defaultFields }) => {
					const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
						if ("name" in field && field.name === "url") return false;
						return true;
					});

					return [
						...defaultFieldsWithoutUrl,
						{
							name: "url",
							type: "text",
							admin: {
								condition: ({ linkType }) => linkType !== "internal"
							},
							label: ({ t }) => t("fields:enterURL"),
							required: true
						}
					];
				}
			}),
			ColorTextFeature({
				enabledColors: [
					{
						label: "Orange",
						className: "text-tokyo-night-orange"
					},
					{
						label: "Cyan",
						className: "text-tokyo-night-cyan"
					},
					{
						label: "Magenta",
						className: "text-tokyo-night-magenta"
					}
				]
			})
		];
	}
});
