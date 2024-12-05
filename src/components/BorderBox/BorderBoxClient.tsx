"use client";

import React from "react";

import cn from "@/utils/cn";

import { useNavigableFocus } from "../NavigableComponents/NavigableFocusContext";

interface BorderBoxClientProps {
	children: React.ReactNode;
	colors?: {
		focussedClassName: string;
		unFocussedClassName: string;
	};
}

const BorderBoxClient: React.FC<BorderBoxClientProps> = (props) => {
	const isFocused = useNavigableFocus();

	return (
		<div
			className={cn(
				"relative box-border h-full w-full border-2 p-2",
				isFocused
					? props.colors
						? props.colors.focussedClassName
						: "border-tokyo-night-red"
					: props.colors
						? props.colors.unFocussedClassName
						: "border-tokyo-night-selection"
			)}
		>
			{props.children}
		</div>
	);
};

export default React.memo(BorderBoxClient);
