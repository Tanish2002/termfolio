import typography from "@tailwindcss/typography";
import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Custom plugin to handle theme color mapping
const tokyoNightThemePlugin = plugin(
	// Plugin function
	({ addBase, theme, addUtilities }) => {
		const tokyoNightColors = theme("colors.tokyo-night-dark", {});
		const tokyoNightLightColors = theme("colors.tokyo-night-light", {});

		// Generate CSS variables for both themes
		const cssVars = {
			":root": Object.fromEntries(
				Object.entries(tokyoNightLightColors).map(([key, value]) => [
					`--color-tokyo-night-${key}`,
					value
				])
			),
			".dark": Object.fromEntries(
				Object.entries(tokyoNightColors).map(([key, value]) => [
					`--color-tokyo-night-${key}`,
					value
				])
			)
		} as Record<string, Record<string, string>>; // Ensure correct typing

		// Add the CSS variables to the base styles
		addBase(cssVars);
	},

	// Configuration function
	{
		theme: {
			extend: {
				colors: {
					"tokyo-night": {
						DEFAULT:
							"color-mix(in srgb, var(--color-tokyo-night-background) calc(<alpha-value> * 100%), transparent)",
						background:
							"color-mix(in srgb, var(--color-tokyo-night-background) calc(<alpha-value> * 100%), transparent)",
						foreground:
							"color-mix(in srgb, var(--color-tokyo-night-foreground) calc(<alpha-value> * 100%), transparent)",
						"code-background":
							"color-mix(in srgb, var(--color-tokyo-night-code-background) calc(<alpha-value> * 100%), transparent)",
						red: "color-mix(in srgb, var(--color-tokyo-night-red) calc(<alpha-value> * 100%), transparent)",
						orange:
							"color-mix(in srgb, var(--color-tokyo-night-orange) calc(<alpha-value> * 100%), transparent)",
						yellow:
							"color-mix(in srgb, var(--color-tokyo-night-yellow) calc(<alpha-value> * 100%), transparent)",
						green:
							"color-mix(in srgb, var(--color-tokyo-night-green) calc(<alpha-value> * 100%), transparent)",
						blue: "color-mix(in srgb, var(--color-tokyo-night-blue) calc(<alpha-value> * 100%), transparent)",
						cyan: "color-mix(in srgb, var(--color-tokyo-night-cyan) calc(<alpha-value> * 100%), transparent)",
						purple:
							"color-mix(in srgb, var(--color-tokyo-night-purple) calc(<alpha-value> * 100%), transparent)",
						magenta:
							"color-mix(in srgb, var(--color-tokyo-night-magenta) calc(<alpha-value> * 100%), transparent)",
						"darker-blue":
							"color-mix(in srgb, var(--color-tokyo-night-dark-blue) calc(<alpha-value> * 100%), transparent)",
						"darker-cyan":
							"color-mix(in srgb, var(--color-tokyo-night-dark-cyan) calc(<alpha-value> * 100%), transparent)",
						"darker-purple":
							"color-mix(in srgb, var(--color-tokyo-night-dark-purple) calc(<alpha-value> * 100%), transparent)",
						selection:
							"color-mix(in srgb, var(--color-tokyo-night-selection) calc(<alpha-value> * 100%), transparent)",
						comment:
							"color-mix(in srgb, var(--color-tokyo-night-comment) calc(<alpha-value> * 100%), transparent)"
					}
				}
			}
		}
	}
);

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
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
	},
	plugins: [tokyoNightThemePlugin, typography]
};

export default config;
