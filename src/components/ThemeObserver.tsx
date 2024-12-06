"use client";

import { useEffect } from "react";

import { updateUserTheme } from "@/lib/userSettings/userSettings.server";

export function ThemeObserver() {
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (e: MediaQueryListEvent) => {
			const newTheme = e.matches ? "dark" : "light";
			updateUserTheme({ theme: "system" });

			// Update theme classes
			document.documentElement.classList.toggle("dark", e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return null;
}
