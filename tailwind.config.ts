import typography from "@tailwindcss/typography";

import tokyoNightThemePlugin from "./src/lib/tokyo-night-plugin";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	darkMode: ["selector", '[data-theme="dark"]'],
	plugins: [typography, tokyoNightThemePlugin],
	prefix: "",
	safelist: [
		"lg:col-span-4",
		"lg:col-span-6",
		"lg:col-span-8",
		"lg:col-span-12",
		"border-border",
		"bg-card",
		"border-error",
		"bg-error/30",
		"border-success",
		"bg-success/30",
		"border-warning",
		"bg-warning/30"
	],
	theme: {
		extend: {
			colors: {
				// not really tokyo-night-light, I initially used tokyo-night-light but later decided to use catppuccin latte colorscheme
				"tokyo-night-light": {
					background: "#e6e9ef", // Soft, neutral light background
					"code-background": "#eff1f5",
					foreground: "#4c4f69", // Darker text for readability
					selection: "#7c7f93", // Muted greenish highlight for selection
					comment: "#bcc0cc", // Softer grey for comments
					red: "#d20f39", // Muted pinkish red
					orange: "#fe640b", // Warm, softer orange
					yellow: "#df8e1d", // Gold-like yellow
					green: "#40a02b", // Soft green
					blue: "#1e66f5", // Lighter, softer blue
					cyan: "#04a5e5", // Muted light cyan
					purple: "#8839ef", // Softer purple
					magenta: "#7287fd", // Light magenta
					"dark-blue": "#209fb5", // Pale sky blue
					"dark-cyan": "#179299", // Muted seafoam green
					"dark-purple": "#d1cdd0" // Soft greyish purple
				},
				"tokyo-night-dark": {
					background: "#1a1b26",
					"code-background": "#222436",
					foreground: "#c0caf5",
					selection: "#2d4f67",
					comment: "#565f89",
					red: "#f7768e",
					orange: "#ff9e64",
					yellow: "#e0af68",
					green: "#9ece6a",
					blue: "#7aa2f7",
					cyan: "#7dcfff",
					purple: "#bb9af7",
					magenta: "#c678dd",
					"dark-blue": "#3d59a1",
					"dark-cyan": "#1abc9c",
					"dark-purple": "#1e2239"
				}
			},
			animation: {
				"character-walk": "character-walk 5s linear infinite"
			},
			keyframes: {
				"character-walk": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" }
				}
			},
			fontFamily: {
				mono: ["var(--font-mono)"],
				scientifica: ["var(--font-scientifica)"]
			}
		}
	}
};
