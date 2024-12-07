"use client";

import { createContext, useEffect, useState } from "react";

import {
	ResolvedThemeType,
	ThemeSettings,
	ThemeType
} from "@/lib/userSettings/userSettings.client";
import { updateUserTheme } from "@/lib/userSettings/userSettings.client";

// Create Theme Context
export const ThemeContext = createContext<{
	theme: ThemeType;
	systemTheme: ResolvedThemeType;
	setTheme: (theme: ThemeType) => void;
}>({
	theme: "dark",
	systemTheme: "dark",
	setTheme: () => {}
});

// Theme Provider Component
export function ThemeProvider({
	children,
	initialTheme
}: {
	children: React.ReactNode;
	initialTheme: ThemeSettings;
}) {
	// Resolve theme based on user preference and system setting
	const resolveTheme = (themePreference: ThemeType | null): ResolvedThemeType => {
		if (themePreference === "system") {
			// Check media query if available
			if (typeof window !== "undefined") {
				return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			}
			return "dark"; // Default to dark if no media query
		}
		return themePreference ?? "dark"; // default dark mode
	};

	const [systemTheme, setSystemTheme] = useState<ResolvedThemeType>(resolveTheme("system")); // get initial system theme
	const [theme, setThemeState] = useState<ThemeType>(initialTheme.theme!);

	const setTheme = (newTheme: ThemeType) => {
		const resolvedTheme = resolveTheme(newTheme);

		// Update cookie
		updateUserTheme({ theme: newTheme, resolvedTheme: resolvedTheme });

		// Update state
		setThemeState(newTheme);

		// apply theme
		applyTheme(resolvedTheme);
	};

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

	// Effect to keep track of theme changes
	useEffect(() => {
		// Resolve and apply initial theme
		const resolvedTheme = resolveTheme(theme);
		applyTheme(resolvedTheme);
	}, [theme, initialTheme.theme]);

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
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, systemTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
