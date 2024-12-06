"use client";

import { useState } from "react";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa6";
import cn from "@/utils/cn";
import BorderBox from "../BorderBox/BorderBox";
import { updateUserTheme } from "@/lib/userSettings/userSettings.server";
import { getSystemTheme } from "@/lib/userSettings/userSettings.client";
import ThemeColorPreview from "./ThemeColorPreview";

type ThemeOption = "light" | "dark" | "system";

export default function ThemeForm({ initialTheme }: { initialTheme: ThemeOption }) {
	const [theme, setTheme] = useState<ThemeOption>(initialTheme);

	const themePreviewMap = {
		"light": {
			title: "Light Mode Preview",
			background: "bg-tokyo-night-light-background",
			text: "text-tokyo-night-light-foreground",
			focussedClassName: "border-tokyo-night-dark-red",
			unFocussedClassName: "border-tokyo-night-light-selection"
		},
		"dark": {
			title: "Dark Mode Preview",
			background: "bg-tokyo-night-dark-background",
			text: "text-tokyo-night-dark-foreground",
			focussedClassName: "border-tokyo-night-dark-red",
			unFocussedClassName: "border-tokyo-night-light-selection",
		},
		"system": {
			title: "System Theme Preview",
			background: getSystemTheme() === "dark"
				? "bg-tokyo-night-dark-background"
				: "bg-tokyo-night-light-background",
			text: getSystemTheme() === "dark"
				? "text-tokyo-night-dark-foreground"
				: "text-tokyo-night-light-foreground",
			focussedClassName: getSystemTheme() === "dark"
				? "border-tokyo-night-dark-red"
				: "border-tokyo-night-light-red",
			unFocussedClassName: getSystemTheme() === "dark"
				? "border-tokyo-night-dark-selection"
				: "border-tokyo-night-light-selection"
		}
	};

	const currentPreview = themePreviewMap[theme];

	return (
		<form action={() => updateUserTheme({ theme })} className="space-y-6">
			<div className="mt-6">
				<label className="mb-2 block font-medium">Choose Site Theme</label>

				<ul className="grid w-full gap-6 md:grid-cols-3">
					{["dark", "light", "system"].map((themeOption) => (
						<li key={themeOption} className="h-full">
							<input
								type="radio"
								id={`theme-${themeOption}`}
								name="theme"
								value={`theme-${themeOption}`}
								checked={theme === themeOption}
								onChange={() => setTheme(themeOption as ThemeOption)}
								className="peer hidden"
							/>
							<label
								htmlFor={`theme-${themeOption}`}
								className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection bg-tokyo-night-darker-purple p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										{themeOption === "dark" ? "Dark Mode" :
											themeOption === "light" ? "Light Mode" :
												"System Theme"}
									</div>
									<div className="w-full">
										{themeOption === "dark" ? "Good for Indoor conditions" :
											themeOption === "light" ? "Good for Outdoor conditions" :
												"Match device preferences"}
									</div>
								</div>
								{themeOption === "dark" ? <FaMoon /> :
									themeOption === "light" ? <FaSun /> :
										<FaDesktop />}
							</label>
						</li>
					))}
				</ul>

				{/* Theme Preview Section */}
				<div className="my-4">
					<BorderBox
						internalPaddingClass="0"
						colors={{
							focussedClassName: currentPreview["focussedClassName"],
							unFocussedClassName: currentPreview["unFocussedClassName"]
						}}
					>
						<div className={cn(
							currentPreview.background,
							currentPreview.text,
							"p-4"
						)}>
							<h3 className="mb-2 text-lg font-bold underline">
								{currentPreview.title}
							</h3>
							<ThemeColorPreview actualTheme={theme === 'system'
								? (typeof window !== 'undefined'
									? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
									: 'dark')
								: theme} />
						</div>
					</BorderBox>
				</div>
			</div>

			<button
				type="submit"
				className="mt-6 rounded bg-tokyo-night-purple px-4 py-2 text-tokyo-night-background transition hover:bg-tokyo-night-purple/80"
			>
				Save Theme
			</button>
		</form>
	);
}
