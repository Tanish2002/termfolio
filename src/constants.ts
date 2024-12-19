import { Victor_Mono } from "next/font/google";
import localFont from "next/font/local";

export const scientifica = localFont({
	src: [
		{
			path: "./app/(frontend)/fonts/scientifica.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "./app/(frontend)/fonts/scientificaItalic.ttf",
			weight: "400",
			style: "italic"
		},
		{
			path: "./app/(frontend)/fonts/scientificaBold.ttf",
			weight: "700",
			style: "normal"
		}
	],
	variable: "--font-scientifica",
	adjustFontFallback: "Times New Roman"
});

export const mono = Victor_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	adjustFontFallback: true
});
