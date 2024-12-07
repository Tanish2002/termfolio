'use server';
import { getCookie, setCookie } from "cookies-next/server";
import { FontSettings, ThemeSettings } from "./userSettings.client";
import { cookies } from "next/headers";

export async function getCurrentFont(): Promise<FontSettings> {
	const fontCookie = await getCookie("user-font", { cookies });

	// Default is scientifica
	return {
		font: fontCookie === "mono" ? "mono" : "scientifica"
	};
}

export async function getCurrentTheme(): Promise<ThemeSettings> {
	const themeCookie = await getCookie("user-theme", { cookies });
	const resolvedThemeCookie = await getCookie("user-resolved-theme", { cookies });

	const validTheme =
		themeCookie === 'light' ||
			themeCookie === 'dark' ||
			themeCookie === 'system'
			? themeCookie
			: null;

	const validResolvedTheme =
		resolvedThemeCookie === "light" || resolvedThemeCookie === "dark" ? resolvedThemeCookie : null

	return {
		theme: validTheme || 'system', // default to system
		resolvedTheme: validResolvedTheme || 'dark' // default to dark
	};
}

export async function updateUserTheme(settings: ThemeSettings) {
	await setCookie("user-theme", settings.theme, { cookies });
}

export async function updateUserFont(settings: FontSettings) {
	setCookie("user-font", settings.font, { cookies });
}
