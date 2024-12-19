import plugin from "tailwindcss/plugin";

const tokyoNightThemePlugin = plugin(
	// Plugin function
	({ addBase, theme }) => {
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
		}; // Ensure correct typing

		// Add the CSS variables to the base styles
		// @ts-ignore
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
export default tokyoNightThemePlugin;
