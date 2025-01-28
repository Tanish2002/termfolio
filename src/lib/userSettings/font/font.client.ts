import { getCookie, setCookie } from "cookies-next/client";
import { SetStateAction, useAtomValue } from "jotai";

import { FontOption, fontAtom } from "@/store/fontAtom";

import { FontSettings } from "./types";

// https://stackoverflow.com/questions/77346295/typescript-error-cannot-find-name-setatom-when-using-jotai
type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

// function to set user selected font in cookie on client
function updateUserFont(settings: FontSettings) {
  setCookie("user-font", settings.font);
}

export const applyFont = (font: FontOption) => {
  if (typeof document !== "undefined") {
    const bodyElement = document.body;
    if (font === "scientifica") {
      bodyElement.classList.remove("font-mono");
      bodyElement.classList.add("font-scientifica");
      return;
    }
    bodyElement.classList.remove("font-scientifica");
    bodyElement.classList.add("font-mono");
  }
};

export const setUserFont = (
  newFont: FontOption,
  setFontState: SetAtom<[SetStateAction<FontOption>], void>
) => {
  // Update cookie
  updateUserFont({ font: newFont });

  // Update state
  setFontState(newFont);

  // apply theme
  applyFont(newFont);
};

export function getCurrentFontCookie(): FontSettings {
  const fontCookie = getCookie("user-font");

  const validTheme = fontCookie === "mono" || fontCookie === "scientifica" ? fontCookie : null;

  return {
    font: validTheme || "scientifica" // default to scientifica
  };
}
