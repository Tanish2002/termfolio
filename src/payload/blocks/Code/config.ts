import type { Block } from "payload";

const SUPPORTED_LANGUAGES = [
	"typescript",
	"javascript",
	"css",
	"html",
	"shell",
	"nix",
	"haskell",
	"lua",
	"go",
	"rust",
	"cpp",
	"csharp"
];
export const Code: Block = {
	slug: "code",
	interfaceName: "CodeBlock",
	fields: [
		{
			name: "language",
			type: "select",
			defaultValue: "typescript",
			options: [
				...SUPPORTED_LANGUAGES.map((lang) => ({
					label: lang,
					value: lang
				}))
			]
		},
		{
			name: "codeContent",
			label: "Code Content",
			required: true,
			type: "code",
			admin: {
				language: "javascript", // Default language for the editor
				components: {
					Field: "/payload/fields/code/index.tsx#default"
				}
			}
		}
	]
};
