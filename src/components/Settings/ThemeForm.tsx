"use client";

import { useEffect, useMemo, useState } from "react";

import { useAtom, useAtomValue } from "jotai";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa6";
import { toast } from "sonner";

import { setTheme } from "@/lib/userSettings/client";
import { ThemeType, systemThemeAtom, themeAtom } from "@/store/themeAtoms";
import cn from "@/utils/cn";

import BorderBox from "../BorderBox/BorderBox";
import ThemeColorPreview from "./ThemeColorPreview";

export default function ThemeForm() {
	const [userTheme, setUserTheme] = useAtom(themeAtom);
	const systemTheme = useAtomValue(systemThemeAtom);
	const [previewTheme, setPreviewTheme] = useState<ThemeType>(userTheme);

	// initialize the previewTheme with userTheme value so it gets checked automatically on load
	useEffect(() => {
		setPreviewTheme(userTheme);
	}, [userTheme]);

	// Dynamically compute the preview based on current theme and actual theme
	const currentPreview = useMemo(() => {
		switch (previewTheme) {
			case "light":
				return {
					title: "Light Mode Preview",
					background: "bg-tokyo-night-light-background",
					text: "text-tokyo-night-light-foreground",
					focussedClassName: "border-tokyo-night-dark-red",
					unFocussedClassName: "border-tokyo-night-light-selection"
				};
			case "dark":
				return {
					title: "Dark Mode Preview",
					background: "bg-tokyo-night-dark-background",
					text: "text-tokyo-night-dark-foreground",
					focussedClassName: "border-tokyo-night-dark-red",
					unFocussedClassName: "border-tokyo-night-light-selection"
				};
			case "system":
				return {
					title: "System Theme Preview",
					background:
						systemTheme === "dark"
							? "bg-tokyo-night-dark-background"
							: "bg-tokyo-night-light-background",
					text:
						systemTheme === "dark"
							? "text-tokyo-night-dark-foreground"
							: "text-tokyo-night-light-foreground",
					focussedClassName:
						systemTheme === "dark" ? "border-tokyo-night-dark-red" : "border-tokyo-night-light-red",
					unFocussedClassName:
						systemTheme === "dark"
							? "border-tokyo-night-dark-selection"
							: "border-tokyo-night-light-selection"
				};
		}
	}, [previewTheme, systemTheme]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setTheme(previewTheme, setUserTheme);

				toast.success("Theme settings saved successfully!");
			}}
			className="space-y-6"
		>
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
								checked={previewTheme === themeOption}
								onChange={() => setPreviewTheme(themeOption as ThemeType)}
								className="peer hidden"
							/>
							<label
								htmlFor={`theme-${themeOption}`}
								className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										{themeOption === "dark"
											? "Dark Mode"
											: themeOption === "light"
												? "Light Mode"
												: "System Theme"}
									</div>
									<div className="w-full">
										{themeOption === "dark"
											? "Good for Indoor conditions"
											: themeOption === "light"
												? "Good for Outdoor conditions"
												: "Match device preferences"}
									</div>
								</div>
								{themeOption === "dark" ? (
									<FaMoon />
								) : themeOption === "light" ? (
									<FaSun />
								) : (
									<FaDesktop />
								)}
							</label>
						</li>
					))}
				</ul>

				{/* Save Button */}
				<div className="mt-6 flex justify-center">
					<button
						type="submit"
						className="w-full rounded border border-tokyo-night-selection bg-tokyo-night-background px-6 py-3 text-lg font-semibold text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 hover:text-tokyo-night-magenta focus:outline-none focus:ring-2 focus:ring-tokyo-night-magenta md:w-auto"
					>
						Save Theme
					</button>
				</div>

				{/* Theme Preview Section */}
				<div className="my-4">
					<BorderBox
						internalPaddingClass="0"
						colors={{
							focussedClassName: currentPreview["focussedClassName"],
							unFocussedClassName: currentPreview["unFocussedClassName"]
						}}
					>
						<div className={cn(currentPreview.background, currentPreview.text, "p-4")}>
							<h3 className="mb-2 text-lg font-bold underline">{currentPreview.title}</h3>
							<ThemeColorPreview
								actualTheme={previewTheme === "system" ? systemTheme : previewTheme}
							/>
						</div>
					</BorderBox>
				</div>
			</div>
		</form>
	);
}
