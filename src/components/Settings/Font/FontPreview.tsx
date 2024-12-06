import { mono, scientifica } from "@/constants";

import { FontOption } from "./FontForm";

interface FontShowcaseProps {
	font: FontOption;
	previewMdxComponent: React.ReactNode;
}

const FontShowcase = ({ font, previewMdxComponent }: FontShowcaseProps) => {
	const fontClass = font === "scientifica" ? scientifica.className : mono.className;

	return <div className={`p-4 ${fontClass} prose-lg`}>{previewMdxComponent}</div>;
};

export default FontShowcase;
