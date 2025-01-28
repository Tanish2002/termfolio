import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { codeToHast } from "shiki";

import Pre from "@/components/Blog/MdComponents/Pre";
import Span from "@/components/Blog/MdComponents/Span";
import { FontOption } from "@/store/fontAtom";

export type CodeBlockProps = {
  codeContent: string;
  language: string;
  isInline?: boolean;
  font?: FontOption;
};

export default async function CodeBlock({
  codeContent,
  language = "javascript",
  font,
  isInline = false
}: CodeBlockProps) {
  const hast = await codeToHast(codeContent, {
    lang: language,
    themes: {
      light: "tokyo-night",
      dark: "tokyo-night"
    },
    transformers: []
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => (
        <Pre
          {...props}
          language={language}
          code_content={codeContent}
          isInline={isInline}
          font={font}
        />
      ),
      span: (props) => <Span {...props} />
    }
  });
}
