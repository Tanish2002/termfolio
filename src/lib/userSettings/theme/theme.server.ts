"use server";

import { cookies } from "next/headers";

import { getCookie, setCookie } from "cookies-next/server";

import { ThemeSettings } from "./types";

// get current user theme from cookies on server
export async function getCurrentTheme(): Promise<ThemeSettings> {
  const themeCookie = await getCookie("user-theme", { cookies });
  const resolvedThemeCookie = await getCookie("user-resolved-theme", {
    cookies,
  });

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

// function to set user selected theme in cookie on server
export async function updateUserTheme(settings: ThemeSettings) {
  await setCookie("user-theme", settings.theme, { cookies });
}
