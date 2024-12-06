import localFont from "next/font/local";
import { FontOption } from "./FontForm";
import { Victor_Mono } from "next/font/google";

interface FontShowcaseProps {
	font: FontOption;
}

const scientifica = localFont({
	src: [
		{
			path: "../../app/fonts/scientifica.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "../../app/fonts/scientificaItalic.ttf",
			weight: "400",
			style: "italic"
		},
		{
			path: "../../app/fonts/scientificaBold.ttf",
			weight: "700",
			style: "normal"
		}
	],
	variable: "--font-text",
	adjustFontFallback: "Times New Roman"
});

const mono = Victor_Mono({ subsets: ["latin"] });

const FontShowcase = ({ font }: FontShowcaseProps) => {
	const fontClass = font === "scientifica" ? scientifica.className : mono.className;

	return (
		<div className={`p-4 ${fontClass}`}>
			{/* Headings */}
			<section>
				<h1 className="text-2xl font-bold mb-2">Heading Level 1</h1>
				<h2 className="text-xl font-bold mb-2">Heading Level 2</h2>
				<h3 className="text-lg font-bold mb-2">Heading Level 3</h3>
				<h4 className="text-md font-bold mb-2">Heading Level 4</h4>
			</section>

			{/* Text Styles */}
			<section>
				<p className="mb-2">
					<strong>Bold Text:</strong> This text is bold.
				</p>
				<p className="mb-2">
					<em>Italic Text:</em> This text is italic.
				</p>
				<p className="mb-2">
					<u>Underlined Text:</u> This text is underlined.
				</p>
				<p>
					<del>Strikethrough Text:</del> This text is strikethrough.
				</p>
			</section>

			{/* Lists */}
			<section>
				<h3 className="text-lg font-bold mb-2">Lists</h3>
				<ul className="list-disc pl-5 mb-4">
					<li>First bullet point</li>
					<li>Second bullet point</li>
					<li>Third bullet point</li>
				</ul>
				<ol className="list-decimal pl-5">
					<li>First ordered item</li>
					<li>Second ordered item</li>
					<li>Third ordered item</li>
				</ol>
			</section>

			{/* Blockquote */}
			<section>
				<h3 className="text-lg font-bold mb-2">Blockquote</h3>
				<blockquote className="border-l-4 pl-4 italic text-tokyo-night-comment">
					"The quick brown fox jumps over the lazy dog."
				</blockquote>
			</section>

			{/* Code  TODO: add syntax highlighting here */}
			<section>
				<h3 className="text-lg font-bold mb-2">Code Snippet</h3>
				<code className="bg-tokyo-night-background p-1 rounded">const font = "scientifica";</code>
			</section>
		</div>
	);
};

export default FontShowcase;
