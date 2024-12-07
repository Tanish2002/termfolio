import { useContext } from "react";

import { getCookie, setCookie } from "cookies-next/client";

import { ThemeContext } from "@/components/ThemeProvider";

export interface FontSettings {
	font: "scientifica" | "mono";
}

export type ThemeType = "light" | "dark" | "system";
export type ResolvedThemeType = "light" | "dark";

export interface ThemeSettings {
	theme: ThemeType | null;
	resolvedTheme: ResolvedThemeType | null;
}

export function useTheme() {
	return useContext(ThemeContext);
}

export function getCurrentTheme(): ThemeSettings {
	const themeCookie = getCookie("user-theme");
	const resolvedThemeCookie = getCookie("user-resolved-theme");

	const validTheme =
		themeCookie === "light" || themeCookie === "dark" || themeCookie === "system"
			? themeCookie
			: null;

	const validResolvedTheme =
		resolvedThemeCookie === "light" || resolvedThemeCookie === "dark" ? resolvedThemeCookie : null;

	return {
		theme: validTheme || "system", // default to system
		resolvedTheme: validResolvedTheme || "dark" // default to dark
	};
}

export function getCurrentFont(): FontSettings {
	const fontCookie = getCookie("user-font");

	// Default is scientifica
	return {
		font: fontCookie === "mono" ? "mono" : "scientifica"
	};
}

export function updateUserTheme(settings: ThemeSettings) {
	setCookie("user-theme", settings.theme);
}

export function updateUserFont(settings: FontSettings) {
	setCookie("user-font", settings.font);
	if (settings.font === "scientifica") {
		document.body.classList.remove("font-mono");
		document.body.classList.add("font-scientifica");
		return;
	}
	document.body.classList.remove("font-scientifica");
	document.body.classList.add("font-mono");
}
