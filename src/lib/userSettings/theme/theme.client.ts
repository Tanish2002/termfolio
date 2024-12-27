import { getCookie, setCookie } from "cookies-next/client";
import { SetStateAction } from "jotai";

import { ResolvedThemeType, ThemeType } from "@/store/themeAtoms";

import { ThemeSettings } from "./types";

// https://stackoverflow.com/questions/77346295/typescript-error-cannot-find-name-setatom-when-using-jotai
type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

// get current user theme from cookies on client
export function getCurrentTheme(): ThemeSettings {
  const themeCookie = getCookie("user-theme");
  const resolvedThemeCookie = getCookie("user-resolved-theme");

  const validTheme =
    themeCookie === "light" ||
    themeCookie === "dark" ||
    themeCookie === "system"
      ? themeCookie
      : null;

  const validResolvedTheme =
    resolvedThemeCookie === "light" || resolvedThemeCookie === "dark"
      ? resolvedThemeCookie
      : null;

  return {
    theme: validTheme || "system", // default to system
    resolvedTheme: validResolvedTheme || "dark", // default to dark
  };
}

// function to set user selected theme in cookie on client
export function updateUserTheme(settings: ThemeSettings) {
  setCookie("user-theme", settings.theme);
}

// take a theme and a jotai setter function to update cookies and apply theme
export const setTheme = (
  newTheme: ThemeType,
  setThemeState: SetAtom<[SetStateAction<ThemeType>], void>,
) => {
  const resolvedTheme = resolveTheme(newTheme);

  // Update cookie
  updateUserTheme({ theme: newTheme, resolvedTheme: resolvedTheme });

  // Update state
  setThemeState(newTheme);

  // apply theme
  applyTheme(resolvedTheme);
};

// Apply theme to document body
export const applyTheme = (resolvedTheme: ResolvedThemeType) => {
  if (typeof document !== "undefined") {
    const htmlElement = document.documentElement;

    if (resolvedTheme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.setAttribute("data-theme", "light");
    }
  }
};

// Resolve theme based on user preference and system setting
export const resolveTheme = (
  themePreference: ThemeType | null,
): ResolvedThemeType => {
  if (themePreference === "system") {
    // Check media query if available
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark"; // Default to dark if no media query
  }
  return themePreference ?? "dark"; // default dark mode
};
