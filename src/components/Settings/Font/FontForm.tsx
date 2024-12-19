import CodeBlock from "@/payload/blocks/Code/Component";
import cn from "@/utils/cn";

import FontFormClient from "./FontFormClient";

export type FontOption = "scientifica" | "mono";

export default async function FontForm({ initialFont }: { initialFont: FontOption }) {
	return (
		<FontFormClient
			initialFont={initialFont}
			previewMdxComponent={
				<div
					className={cn(
						"prose-p:my-0",
						"prose-ul:list-disc prose-ul:space-y-2 prose-ul:pl-6 prose-ul:sm:pl-8",
						"prose-ol:list-decimal prose-ol:space-y-2 prose-ol:pl-6 prose-ol:sm:pl-8",
						"prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-tokyo-night-comment",
						"divide-y divide-tokyo-night-comment"
					)}
				>
					<div>
						<h1>Heading Level 1</h1>
						<h2>Heading Level 2</h2>
						<h3>Heading Level 3</h3>
						<h4>Heading Level 4</h4>
					</div>
					<div>
						<h3>Text Styles</h3>
						<p>
							<strong>Bold Text:</strong> This text is bold.
						</p>
						<p>
							<em>Italic Text:</em> This text is italic.
						</p>
						<p>
							<u>Underlined Text:</u> This text is underlined.
						</p>
						<p>
							<del>Strikethrough Text:</del> This text is strikethrough.
						</p>
						<h3>Lists</h3>
						<ul>
							<li>First bullet point</li>
							<li>Second bullet point</li>
							<li>Third bullet point</li>
						</ul>
						<ol>
							<li>First ordered item</li>
							<li>Second ordered item</li>
							<li>Third ordered item</li>
						</ol>
					</div>
					<div>
						<h3>Blockquote</h3>
						<blockquote>
							<p>&quot;The quick brown fox jumps over the lazy dog.&quot;</p>
						</blockquote>
					</div>
					<div>
						<h3>Code Snippet</h3>
						<CodeBlock
							language="javascript"
							codeContent={`const font = "${initialFont || "scientifica"}";`}
						/>
					</div>
				</div>
			}
		/>
	);
}
