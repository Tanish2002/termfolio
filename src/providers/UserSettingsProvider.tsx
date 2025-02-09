"use client";

import { useEffect, useState } from "react";

import { useAtom, useSetAtom } from "jotai";

import PreLoader from "@/components/PreLoader";
import { applyTheme } from "@/lib/userSettings/client";
import { FontOption, fontAtom } from "@/store/fontAtom";
import { ResolvedThemeType, ThemeType, systemThemeAtom, themeAtom } from "@/store/themeAtoms";

declare global {
  interface Window {
    __initialTheme?: {
      theme: ThemeType;
      resolvedTheme: ResolvedThemeType;
    };
    __initialFont?: FontOption;
  }
}

export default function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useAtom(themeAtom);
  const setFont = useSetAtom(fontAtom);
  const setSystemTheme = useSetAtom(systemThemeAtom);

  // Sync with the initial theme set by the script tag (so if user goes to /settings/theme or /settings/font the atom isn't empty)
  // could easily remove this and read the cookies in the route itself but the preloader is nice lol
  useEffect(() => {
    if (typeof window !== "undefined" && window.__initialTheme && window.__initialFont) {
      const { theme: initialTheme, resolvedTheme } = window.__initialTheme;
      const initialFont = window.__initialFont;
      setTheme(initialTheme);
      setFont(initialFont);
      applyTheme(resolvedTheme);
      setTimeout(() => {
        setIsLoading(false); // After 1.5 seconds, set loading to false
      }, 1500);
    }
  }, [setTheme, setFont]);

  // Effect to keep track of system theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleMediaQueryChange = () => {
        const newTheme = mediaQuery.matches ? "dark" : "light";
        setSystemTheme(newTheme);
        if (theme === "system") applyTheme(newTheme);
      };

      mediaQuery.addEventListener("change", handleMediaQueryChange);

      // Cleanup
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }
  }, [theme, setSystemTheme]);

  if (isLoading) {
    return <PreLoader />;
  }

  return <>{children}</>;
}
