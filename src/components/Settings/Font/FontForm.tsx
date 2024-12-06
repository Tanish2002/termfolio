import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import Pre from "@/components/Blog/MdComponents/Pre";
import Span from "@/components/Blog/MdComponents/Span";
import cn from "@/utils/cn";

import FontFormClient from "./FontFormClient";

export type FontOption = "scientifica" | "mono";

export default async function FontForm({ initialFont }: { initialFont: FontOption }) {
	const previewText = `
# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

---

### Text Styles

**Bold Text:** This text is bold.  
*Italic Text:* This text is italic.  
<u>Underlined Text:</u> This text is underlined.  
~~Strikethrough Text:~~ This text is strikethrough.

---

### Lists

- First bullet point
- Second bullet point
- Third bullet point

1. First ordered item
2. Second ordered item
3. Third ordered item

---

### Blockquote

> "The quick brown fox jumps over the lazy dog."

---

### Code Snippet

\`\`\`javascript
const font = "scientifica";
\`\`\`
`;

	return (
		<FontFormClient
			initialFont={initialFont}
			previewMdxComponent={
				<MDXRemote
					source={previewText}
					options={{
						mdxOptions: {
							rehypePlugins: [
								[
									rehypePrettyCode,
									{
										theme: { dark: "tokyo-night", light: "catppuccin-latte" }
									}
								]
							],

							format: "mdx"
						}
					}}
					components={{
						pre: Pre,
						span: Span,
						ul: (props) => (
							<ul {...props} className={cn(props.className, "list-disc space-y-2 pl-6 sm:pl-8")}>
								{props.children}
							</ul>
						),

						ol: (props) => (
							<ol {...props} className={cn(props.className, "list-decimal space-y-2 pl-6 sm:pl-8")}>
								{props.children}
							</ol>
						),

						blockquote: (props) => (
							<blockquote
								{...props}
								className={cn(props.className, "border-l-4 pl-4 italic text-tokyo-night-comment")}
							>
								{props.children}
							</blockquote>
						)
						// h1: (props) => (
						// 	<h1 {...props} className={cn(props.className, "text-2xl font-bold mb-2")}>
						// 		{props.children}
						// 	</h1>
						// ),
						// h2: (props) => (
						// 	<h2 {...props} className={cn(props.className, "text-tokyo-night-orange text-xl font-bold mb-2")}>
						// 		{props.children}
						// 	</h2>
						// ),
						// h3: (props) => (
						// 	<h3 {...props} className={cn(props.className, "text-tokyo-night-orange text-lg font-bold mb-2")}>
						// 		{props.children}
						// 	</h3>
						// ),
						// h4: (props) => (
						// 	<h4 {...props} className={cn(props.className, "text-tokyo-night-orange text-md font-bold mb-2")}>
						// 		{props.children}
						// 	</h4>
						// ),
						// p: (props) => (
						// 	<p
						// 		{...props}
						// 		className={cn(
						// 			props.className
						// 			// "leading-relaxed text-base sm:text-lg"
						// 		)}
						// 	>
						// 		{props.children}
						// 	</p>
						// )
					}}
				/>
			}
		/>
	);
}
