"use server";

import { cookies } from "next/headers";

import { getCookie, setCookie } from "cookies-next/server";

import { FontSettings } from "./types";

// get current user font from cookies on server
export async function getCurrentFont(): Promise<FontSettings> {
  const fontCookie = await getCookie("user-font", { cookies });

  // Default is scientifica
  return {
    font: fontCookie === "mono" ? "mono" : "scientifica"
  };
}

// function to set user selected font in cookie on server
export async function updateUserFont(settings: FontSettings) {
  await setCookie("user-font", settings.font, { cookies });
}
