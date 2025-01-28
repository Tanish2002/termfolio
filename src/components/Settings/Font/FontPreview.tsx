import { mono, scientifica } from "@/constants";
import { FontOption } from "@/store/fontAtom";

interface FontShowcaseProps {
  font: FontOption;
  previewComponent: React.ReactNode;
}

const FontShowcase = async ({ font, previewComponent }: FontShowcaseProps) => {
  const fontClass = font === "scientifica" ? scientifica.className : mono.className;

  return <div className={`p-4 ${fontClass} prose-lg`}>{previewComponent}</div>;
};

export default FontShowcase;
