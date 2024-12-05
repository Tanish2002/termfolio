// src/lib/tailwind-tokyo-night-plugin.ts
import plugin from "tailwindcss/plugin";

export const tokyoNightPlugin = plugin(function ({ addBase, theme }) {
	// Define color mappings
	const colorMap = {
		bg: "background",
		text: "foreground",
		selection: "selection",
		comment: "comment",
		red: "red",
		orange: "orange",
		yellow: "yellow",
		green: "green",
		blue: "blue",
		cyan: "cyan",
		purple: "purple",
		magenta: "magenta",
		"dark-blue": "dark-blue",
		"dark-cyan": "dark-cyan",
		"dark-purple": "dark-purple"
	};

	// Generate utility classes for each color
	Object.entries(colorMap).forEach(([key, cssVar]) => {
		addBase({
			[`.bg-tokyo-night-${key}`]: {
				backgroundColor: `var(--color-${cssVar})`
			},
			[`.text-tokyo-night-${key}`]: {
				color: `var(--color-${cssVar})`
			},
			[`.border-tokyo-night-${key}`]: {
				borderColor: `var(--color-${cssVar})`
			}
		});
	});
});
