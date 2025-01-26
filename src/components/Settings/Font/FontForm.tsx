import CodeBlock from "@/payload/blocks/Code/Component";
import cn from "@/utils/cn";

import FontFormClient from "./FontFormClient";

export type FontOption = "scientifica" | "mono";

export default async function FontForm({ initialFont }: { initialFont: FontOption }) {
  return (
    <FontFormClient
      initialFont={initialFont}
      previewMdxComponent={
        <div className={cn("prose w-full max-w-none", "divide-y divide-tokyo-night-comment")}>
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
              <p>The quick brown fox jumps over the lazy dog.</p>
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
