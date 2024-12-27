"use client";

import { useEffect, useState } from "react";

import { useAtom, useSetAtom } from "jotai";

import PreLoader from "@/components/PreLoader";
import { resolveTheme } from "@/lib/userSettings/client";
import { ThemeSettings } from "@/lib/userSettings/theme/types";
import { ResolvedThemeType, systemThemeAtom, themeAtom } from "@/store/themeAtoms";

// Theme Provider Component
export default function ThemeProvider({
  children,
  initialTheme
}: {
  children: React.ReactNode;
  initialTheme: ThemeSettings | null;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useAtom(themeAtom);
  const setSystemTheme = useSetAtom(systemThemeAtom);

  // Set the initial theme when the component mounts
  useEffect(() => {
    setTheme(initialTheme?.theme || "system");
    setTimeout(() => {
      setIsLoading(false); // After 1.5 seconds, set loading to false
    }, 1500);
  }, [initialTheme?.theme, setTheme]);

  // Effect to keep track of theme changes
  useEffect(() => {
    // Resolve and apply initial theme
    const resolvedTheme = resolveTheme(theme);
    applyTheme(resolvedTheme);
  }, [theme, initialTheme?.theme]);

  // Effect to keep track of system theme changes
  useEffect(() => {
    // Setup media query listener for system theme
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

  // Apply theme to document body
  const applyTheme = (resolvedTheme: ResolvedThemeType) => {
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

  if (isLoading) {
    return <PreLoader />;
  }

  // Once the theme is set or after 1.5 seconds, render the main content
  return <>{children}</>;
}
