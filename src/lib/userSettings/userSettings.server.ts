"use server";

import { cookies } from "next/headers";

interface FontSettings {
	font: "scientifica" | "mono";
}

interface ThemeSettings {
	theme: "light" | "dark" | "system";
}

export async function getCurrentFont(): Promise<FontSettings> {
	const cookieStore = await cookies();
	const fontCookie = cookieStore.get("user-font")?.value;

	// Default is scientifica
	return {
		font: fontCookie === "mono" ? "mono" : "scientifica"
	};
}

export async function getCurrentTheme(): Promise<ThemeSettings> {
	const cookieStore = await cookies();
	const themeCookie = cookieStore.get("user-theme")?.value;

	return {
		theme: themeCookie === "dark" ? "dark" : themeCookie === "light" ? "light" : "system"
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
	} catch (error) {
		console.error(error);
	}
}
