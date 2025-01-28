import React from "react";

import { mono } from "@/constants";
import { FontOption } from "@/store/fontAtom";
import cn from "@/utils/cn";

import { LanguageTag } from "./LanguageTag";
import PreClient from "./Pre.client";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string;
  code_content: string;
  isInline?: boolean;
  font?: FontOption;
}

const Pre: React.FC<PreProps> = async ({
  language,
  code_content,
  isInline = false,
  font,
  ...props
}) => {
  const lang = language;
  const isMultiLine = code_content.includes("\n");

  if (isInline && !isMultiLine) {
    return (
      <div className="relative my-3">
        <div
          className={cn(
            "relative block overflow-x-auto rounded-md border border-tokyo-night-selection px-4 py-4",
            "bg-tokyo-night-code-background text-tokyo-night-foreground prose-code:border-none",
            mono.className
          )}
        >
          {props.children}
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <PreClient content={code_content} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", "prose-pre:my-1")}>
      {isMultiLine && <LanguageTag lang={lang} font={font} />}
      <pre
        {...props}
        style={undefined}
        className={cn("relative overflow-x-auto px-4", "my-1 py-4", mono.className)}
      >
        <div className="absolute right-4 top-4">
          <PreClient content={code_content} />
        </div>
        {props.children}
      </pre>
    </div>
  );
};

export default React.memo(Pre);
