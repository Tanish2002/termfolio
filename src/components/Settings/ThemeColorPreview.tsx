interface ThemeColorPreviewProps {
	actualTheme: "light" | "dark";
}

const colors = {
	dark: {
		base: [
			{ label: "background", bgClass: "bg-tokyo-night-dark-background", textClass: "text-tokyo-night-dark-foreground" },
			{ label: "foreground", bgClass: "bg-tokyo-night-dark-foreground", textClass: "text-tokyo-night-dark-background" },
			{ label: "selection", bgClass: "bg-tokyo-night-dark-selection", textClass: "text-tokyo-night-dark-foreground" },
			{ label: "comment", bgClass: "bg-tokyo-night-dark-comment", textClass: "text-tokyo-night-dark-foreground" },
		],
		accent: [
			{ label: "red", bgClass: "bg-tokyo-night-dark-red", textClass: "text-tokyo-night-dark-background" },
			{ label: "orange", bgClass: "bg-tokyo-night-dark-orange", textClass: "text-tokyo-night-dark-background" },
			{ label: "yellow", bgClass: "bg-tokyo-night-dark-yellow", textClass: "text-tokyo-night-dark-background" },
			{ label: "green", bgClass: "bg-tokyo-night-dark-green", textClass: "text-tokyo-night-dark-background" },
			{ label: "blue", bgClass: "bg-tokyo-night-dark-blue", textClass: "text-tokyo-night-dark-background" },
			{ label: "cyan", bgClass: "bg-tokyo-night-dark-cyan", textClass: "text-tokyo-night-dark-background" },
			{ label: "purple", bgClass: "bg-tokyo-night-dark-purple", textClass: "text-tokyo-night-dark-background" },
			{ label: "magenta", bgClass: "bg-tokyo-night-dark-magenta", textClass: "text-tokyo-night-dark-background" },
		],
		additional: [
			{ label: "dark-blue", bgClass: "bg-tokyo-night-dark-dark-blue", textClass: "text-tokyo-night-dark-foreground" },
			{ label: "dark-cyan", bgClass: "bg-tokyo-night-dark-dark-cyan", textClass: "text-tokyo-night-dark-background" },
			{ label: "dark-purple", bgClass: "bg-tokyo-night-dark-dark-purple", textClass: "text-tokyo-night-dark-foreground" },
		],
	},
	light: {
		base: [
			{ label: "background", bgClass: "bg-tokyo-night-light-background", textClass: "text-tokyo-night-light-foreground" },
			{ label: "foreground", bgClass: "bg-tokyo-night-light-foreground", textClass: "text-tokyo-night-light-background" },
			{ label: "selection", bgClass: "bg-tokyo-night-light-selection", textClass: "text-tokyo-night-light-foreground" },
			{ label: "comment", bgClass: "bg-tokyo-night-light-comment", textClass: "text-tokyo-night-light-foreground" },
		],
		accent: [
			{ label: "red", bgClass: "bg-tokyo-night-light-red", textClass: "text-tokyo-night-light-background" },
			{ label: "orange", bgClass: "bg-tokyo-night-light-orange", textClass: "text-tokyo-night-light-background" },
			{ label: "yellow", bgClass: "bg-tokyo-night-light-yellow", textClass: "text-tokyo-night-light-background" },
			{ label: "green", bgClass: "bg-tokyo-night-light-green", textClass: "text-tokyo-night-light-background" },
			{ label: "blue", bgClass: "bg-tokyo-night-light-blue", textClass: "text-tokyo-night-light-background" },
			{ label: "cyan", bgClass: "bg-tokyo-night-light-cyan", textClass: "text-tokyo-night-light-background" },
			{ label: "purple", bgClass: "bg-tokyo-night-light-purple", textClass: "text-tokyo-night-light-background" },
			{ label: "magenta", bgClass: "bg-tokyo-night-light-magenta", textClass: "text-tokyo-night-light-background" },
		],
		additional: [
			{ label: "dark-blue", bgClass: "bg-tokyo-night-light-dark-blue", textClass: "text-tokyo-night-light-foreground" },
			{ label: "dark-cyan", bgClass: "bg-tokyo-night-light-dark-cyan", textClass: "text-tokyo-night-light-background" },
			{ label: "dark-purple", bgClass: "bg-tokyo-night-light-dark-purple", textClass: "text-tokyo-night-light-foreground" },
		],
	},
};

const Section = ({
	title,
	colors,
}: {
	title: string;
	colors: { label: string; bgClass: string; textClass: string }[];
}) => (
	<div>
		<h4 className="text-md font-semibold mb-2 sm:text-lg sm:mb-3">{title}</h4>
		<div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
			{colors.map((color, index) => (
				<div
					key={index}
					className={`p-3 rounded ${color.bgClass} ${color.textClass} font-medium text-sm sm:p-4 sm:text-base`}
				>
					{color.label}
				</div>
			))}
		</div>
	</div>
);

export default function ThemeColorPreview({ actualTheme }: ThemeColorPreviewProps) {
	const themeColors = colors[actualTheme];

	return (
		<div className="space-y-4">
			<Section title="Base Colors" colors={themeColors.base} />
			<Section title="Accent Colors" colors={themeColors.accent} />
			<Section title="Additional Colors" colors={themeColors.additional} />
		</div>
	);
}
