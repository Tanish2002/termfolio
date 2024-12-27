export type ThemeType = "light" | "dark" | "system";
export type ResolvedThemeType = "light" | "dark";

export interface ThemeSettings {
  theme: ThemeType | null;
  resolvedTheme: ResolvedThemeType | null;
}
