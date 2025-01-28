"use client";

import { useAtomValue } from "jotai";

import { mono, scientifica } from "@/constants";
import { FontOption, fontAtom } from "@/store/fontAtom";
import cn from "@/utils/cn";

export function LanguageTag({ lang, font }: { lang: string; font?: FontOption }) {
  let currentFont: FontOption;
  const savedFont = useAtomValue(fontAtom);
  if (!font) {
    currentFont = savedFont;
  } else {
    currentFont = font;
  }

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1 z-50 -translate-x-1/2 transform",
        "rounded-t-md px-4 py-1 text-sm",
        "bg-tokyo-night-code-background text-tokyo-night-orange",
        currentFont === "scientifica" ? scientifica.className : mono.className
      )}
    >
      {lang}
    </div>
  );
}
