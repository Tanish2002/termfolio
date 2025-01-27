import React from "react";

import { mono, scientifica } from "@/constants";
import { getCurrentFont } from "@/lib/userSettings/server";
import cn from "@/utils/cn";

import PreClient from "./Pre.client";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string;
  code_content: string;
  isInline?: boolean;
}

const Pre: React.FC<PreProps> = async ({ language, code_content, isInline = false, ...props }) => {
  const lang = language;
  const currentFont = await getCurrentFont();
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
      {isMultiLine && (
        <div
          className={cn(
            "absolute left-1/2 top-1 z-50 -translate-x-1/2 transform",
            "rounded-t-md px-4 py-1 text-sm",
            "bg-tokyo-night-code-background text-tokyo-night-orange",
            currentFont.font === "scientifica" ? scientifica.className : mono.className
          )}
        >
          {lang}
        </div>
      )}
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
