"use server";

// lib/userSettings.ts
import { cookies } from "next/headers";

interface FontSettings {
	font: "scientifica" | "inter";
}

interface ThemeSettings {
	theme: "light" | "dark";
}

// Default settings
const DEFAULT_SETTINGS: ThemeSettings & FontSettings = {
	font: "inter",
	theme: "light"
};

export async function getCurrentFont(): Promise<FontSettings> {
	const cookieStore = await cookies();

	const fontCookie = cookieStore.get("user-font")?.value;

	return {
		font: fontCookie === "scientifica" ? "scientifica" : "inter"
	};
}

export async function getCurrentTheme(): Promise<ThemeSettings> {
	const cookieStore = await cookies();

	const themeCookie = cookieStore.get("user-theme")?.value;

	return {
		theme: themeCookie === "dark" ? "dark" : "light"
	};
}

export async function updateUserFont(settings: FontSettings) {
	const cookieStore = await cookies();
	cookieStore.set("user-font", settings.font, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365 // 1 year
	});
}

export async function updateUserTheme(settings: ThemeSettings) {
	try {
		const cookieStore = await cookies();
		cookieStore.set("user-theme", settings.theme, {
			path: "/",
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});

		if (settings.theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	} catch (error) {
		console.error(error);
	}
}
