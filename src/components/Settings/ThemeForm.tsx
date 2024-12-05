"use client";

import { useState } from "react";

import { FaMoon, FaSun } from "react-icons/fa6";

import { updateUserTheme } from "@/lib/userSettings";
import cn from "@/utils/cn";

import BorderBox from "../BorderBox/BorderBox";

type ThemeOption = "light" | "dark";

export default function ThemeForm({ initialTheme }: { initialTheme: ThemeOption }) {
	const [theme, setTheme] = useState<ThemeOption>(initialTheme);

	return (
		<form action={() => updateUserTheme({ theme })} className="space-y-6">
			{/* Theme Selection */}
			<div className="mt-6">
				<label className="mb-2 block font-medium">Choose Site Theme</label>

				<ul className="grid w-full gap-6 md:grid-cols-2">
					<li className="h-full">
						<input
							type="radio"
							id="theme-dark"
							name="theme"
							value="theme-dark"
							checked={theme === "dark"}
							onChange={() => setTheme("dark")}
							className="peer hidden"
							required
						/>
						<label
							htmlFor="theme-dark"
							className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection bg-tokyo-night-darker-purple p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">Dark Mode</div>
								<div className="w-full">Good for Indoor conditions</div>
							</div>
							<FaMoon />
						</label>
					</li>
					<li className="h-full">
						<input
							type="radio"
							id="theme-light"
							name="theme"
							value="theme-light"
							checked={theme === "light"}
							onChange={() => setTheme("light")}
							className="peer hidden"
						/>
						<label
							htmlFor="theme-light"
							className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection bg-tokyo-night-darker-purple p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">Light Mode</div>
								<div className="w-full">Good for Outdoor conditions</div>
							</div>
							<FaSun />
						</label>
					</li>
				</ul>

				{/* Theme Preview Section */}
				<div className="my-4">
					<BorderBox
						texts={[
							{
								textYPosition: "top",
								textXPosition: "left",
								text: "theme preview",
								className:
									theme === "dark" ? "text-tokyo-night-dark-red" : "text-tokyo-night-light-red"
							}
						]}
						colors={{
							focussedClassName:
								theme === "dark" ? "border-tokyo-night-dark-red" : "border-tokyo-night-light-red",
							unFocussedClassName:
								theme === "dark"
									? "border-tokyo-night-dark-selection"
									: "border-tokyo-night-light-selection"
						}}
					>
						<div
							className={cn(
								theme === "dark"
									? "bg-tokyo-night-dark-background text-tokyo-night-dark-foreground"
									: "bg-tokyo-night-light-background text-tokyo-night-light-foreground"
							)}
						>
							<h3 className="mb-2 text-lg font-bold">
								{theme === "dark" ? "Dark Mode Preview" : "Light Mode Preview"}
							</h3>
							<p>
								This section demonstrates how the site will look in {theme} mode. Notice the
								background and text color changes to provide a comfortable reading experience across
								different lighting conditions.
							</p>
						</div>
					</BorderBox>
				</div>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="mt-6 rounded bg-tokyo-night-purple px-4 py-2 text-tokyo-night-background transition hover:bg-tokyo-night-purple/80"
			>
				Save Theme
			</button>
		</form>
	);
}
