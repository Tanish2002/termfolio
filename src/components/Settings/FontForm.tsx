"use client";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { useState } from "react";

import { HiOutlineNewspaper } from "react-icons/hi";
import { ImTerminal } from "react-icons/im";

import { updateUserFont } from "@/lib/userSettings";
import cn from "@/utils/cn";

import BorderBox from "../BorderBox/BorderBox";

type FontOption = "scientifica" | "inter";

const scientifica = localFont({
	src: [
		{
			path: "../../app/fonts/scientifica.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "../../app/fonts/scientificaItalic.ttf",
			weight: "400",
			style: "italic"
		},
		{
			path: "../../app/fonts/scientificaBold.ttf",
			weight: "700",
			style: "normal"
		}
	],
	variable: "--font-text",
	adjustFontFallback: "Times New Roman"
});

// Sample text for font preview
const fontPreviewText = `
    The quick brown fox jumps over the lazy dog. 
    This pangram contains every letter of the English alphabet.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nulla quis lorem ut libero malesuada feugiat.
  `;
const inter = Inter({ subsets: ["latin"] });
export default function FontForm({ initialFont }: { initialFont: FontOption }) {
	const [font, setFont] = useState<FontOption>(initialFont);

	return (
		<form action={() => updateUserFont({ font })} className="space-y-6">
			<div>
				<label className="mb-2 block font-medium">Choose Site Font</label>

				<ul className="grid w-full gap-6 md:grid-cols-2">
					<li className="h-full">
						<input
							type="radio"
							id="font-scientifica"
							name="font"
							value="font-scientifica"
							checked={font === "scientifica"}
							onChange={() => setFont("scientifica")}
							className="peer hidden"
							required
						/>
						<label
							htmlFor="font-scientifica"
							className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection bg-tokyo-night-darker-purple p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">Scientifica</div>
								<div className="w-full">Terminal like font, Reccommended for best experience</div>
							</div>
							<ImTerminal />
						</label>
					</li>
					<li className="h-full">
						<input
							type="radio"
							id="font-inter"
							name="font"
							value="font-inter"
							checked={font === "inter"}
							onChange={() => setFont("inter")}
							className="peer hidden"
						/>
						<label
							htmlFor="font-inter"
							className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection bg-tokyo-night-darker-purple p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">Inter</div>
								<div className="w-full">
									Most common website font, use it if you have difficulty reading
								</div>
							</div>
							<HiOutlineNewspaper />
						</label>
					</li>
				</ul>

				<div className="my-4">
					<BorderBox
						texts={[
							{
								textYPosition: "top",
								textXPosition: "left",
								text: "font preview"
							}
						]}
					>
						<div
							className={cn(
								"bg-tokyo-night-background text-tokyo-night-foreground",
								font === "scientifica" ? scientifica.className : inter.className
							)}
						>
							<h3 className="mb-2 text-lg font-bold">
								{font === "scientifica" ? "Scientifica Font Preview" : "Inter Font Preview"}
							</h3>
							<p>{fontPreviewText}</p>
							<div className="mt-4 space-y-2">
								<p className="italic">{fontPreviewText.slice(0, 100)}...</p>
								<p className="font-bold">{fontPreviewText.slice(0, 100)}...</p>
							</div>
						</div>
					</BorderBox>
				</div>
			</div>

			<button
				type="submit"
				className="mt-6 rounded bg-tokyo-night-purple px-4 py-2 text-tokyo-night-background transition hover:bg-tokyo-night-purple/80"
			>
				Save Font
			</button>
		</form>
	);
}
