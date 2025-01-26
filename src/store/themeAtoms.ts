import { atom } from "jotai";

export type ThemeType = "light" | "dark" | "system";
export type ResolvedThemeType = "light" | "dark";

export const themeAtom = atom<ThemeType>("system");
export const systemThemeAtom = atom<ResolvedThemeType>("dark");
