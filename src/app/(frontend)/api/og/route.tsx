import Image from "next/image";
import { ImageResponse } from "next/og";

import { formatDistance } from "date-fns";

// Tokyo Night Color Palette
// Unfortunately can't use tailwind here, so gotta do this
const tokyoNightColors = {
	background: "#1a1b26",
	codeBackground: "#222436",
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
	darkBlue: "#3d59a1",
	darkCyan: "#1abc9c",
	darkPurple: "#1e2239"
};

// Utility to truncate text
const truncateText = (text: string, maxLength = 50) => {
	return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get("type");
	const title = searchParams.get("title");
	const tags = searchParams.get("tags");
	const image = searchParams.get("image");
	const createdAt = searchParams.get("createdAt");

	async function loadGoogleFont(font: string, text: string) {
		const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
		const css = await (await fetch(url)).text();
		const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

		if (resource) {
			const response = await fetch(resource[1]);
			if (response.status == 200) {
				return await response.arrayBuffer();
			}
		}

		throw new Error("failed to load font data");
	}

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					height: "100%",
					width: "100%",
					backgroundColor: tokyoNightColors.background,
					padding: "60px",
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				{/* Left side - Content */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						maxWidth: "60%"
					}}
				>
					{/* Type Badge */}
					{type && (
						<div
							style={{
								backgroundColor: tokyoNightColors.blue,
								color: tokyoNightColors.background,
								padding: "8px 16px",
								borderRadius: "20px",
								fontSize: "20px",
								marginBottom: "20px",
								textTransform: "capitalize",
								fontWeight: 600
							}}
						>
							{type}
						</div>
					)}

					{/* Title */}
					<h1
						style={{
							fontSize: "48px",
							color: tokyoNightColors.foreground,
							margin: "0 0 20px 0",
							lineHeight: 1.2,
							fontWeight: 600
						}}
					>
						{truncateText(title || "", 60)}
					</h1>

					{/* Tags */}
					{tags && (
						<div
							style={{
								display: "flex",
								gap: "10px",
								marginTop: "20px"
							}}
						>
							{tags.split(",").map((tag, index) => (
								<div
									key={index}
									style={{
										backgroundColor: `${tokyoNightColors.darkBlue}20`, // 20 adds opacity
										color: tokyoNightColors.cyan,
										padding: "6px 12px",
										borderRadius: "15px",
										fontSize: "18px"
									}}
								>
									{tag}
								</div>
							))}
						</div>
					)}

					{/* Created At */}
					{createdAt && (
						<div
							style={{
								marginTop: "20px",
								fontSize: "20px",
								color: tokyoNightColors.comment
							}}
						>
							{formatDistance(new Date(createdAt), new Date(), {
								addSuffix: true
							})}
						</div>
					)}
				</div>

				{/* Right side - Image */}
				{image && (
					<div
						style={{
							display: "flex",
							width: "35%",
							height: "100%",
							borderRadius: "20px",
							overflow: "hidden",
							boxShadow: `0 10px 30px ${tokyoNightColors.darkPurple}`
						}}
					>
						<Image
							src={image}
							alt="Project Banner"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover"
							}}
						/>
					</div>
				)}
			</div>
		),
		{
			width: 1200,
			height: 630,

			fonts: [
				{
					name: "Inter",
					data: await loadGoogleFont("Inter", title || "bakaotaku.dev"),
					style: "normal"
				}
			]
		}
	);
}

export const config = {
	api: {
		responseType: "buffer"
	}
};
