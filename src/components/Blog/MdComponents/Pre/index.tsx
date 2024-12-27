import React from "react";

import { mono, scientifica } from "@/constants";
import { getCurrentFont } from "@/lib/userSettings/server";
import cn from "@/utils/cn";

import PreClient from "./Pre.client";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string;
  code_content: string;
}

const Pre: React.FC<PreProps> = async (props) => {
  const lang = props.language;
  const currentFont = await getCurrentFont();

  return (
    <div className={cn("relative")}>
      <div
        className={cn(
          "absolute left-1/2 top-1 -translate-x-1/2 transform",
          "rounded-t-md",
          "px-4 py-1 text-sm",
          "text-tokyo-night-orange",
          "bg-tokyo-night-code-background",
          currentFont.font === "scientifica"
            ? scientifica.className
            : mono.className,
        )}
      >
        {lang}
      </div>
      <pre
        {...props}
        className={cn(
          // "text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]",
          "bg-tokyo-night-code-background",
          "my-3 overflow-x-auto px-4 pt-8",
          mono.className, // code content will always be by default mono
        )}
        style={undefined}
      />
      <div className="absolute right-4 top-4">
        <PreClient content={props.code_content} />
      </div>
    </div>
  );
};

export default Pre;
