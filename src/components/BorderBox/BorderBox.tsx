import React from "react";

import cn from "@/utils/cn";

import BorderBoxClient from "./BorderBoxClient";

export interface TextProps {
	textYPosition: "top" | "bottom";
	textXPosition: "left" | "center" | "right";
	text: string;
	className?: string;
}

interface BorderBoxProps {
	texts: TextProps[];
	children: React.ReactNode;
	colors?: {
		focussedClassName: string;
		unFocussedClassName: string;
	};
}

const BorderBox: React.FC<BorderBoxProps> = ({ texts, children, colors }) => {
	const getYPositionClass = (textYPosition: TextProps["textYPosition"]): string => {
		return textYPosition === "bottom" ? "-bottom-3" : "-top-3";
	};

	const getXPositionClass = (textXPosition: TextProps["textXPosition"]): string => {
		switch (textXPosition) {
			case "left":
				return "left-2 transform translate-x-2";
			case "right":
				return "right-0 transform translate-x-0";
			case "center":
			default:
				return "left-1/2 transform -translate-x-1/2";
		}
	};

	return (
		<BorderBoxClient colors={colors}>
			{texts.map(({ textYPosition, textXPosition, text, className }, index) => (
				<span
					key={index}
					className={cn(
						"absolute bg-tokyo-night-background px-2 text-tokyo-night-red",
						getYPositionClass(textYPosition),
						getXPositionClass(textXPosition),
						className
					)}
				>
					{text}
				</span>
			))}
			<div className="relative h-full overflow-y-auto">
				<div className="flex min-h-full flex-col py-2 text-lg">{children}</div>
			</div>
		</BorderBoxClient>
	);
};

export default React.memo(BorderBox);
