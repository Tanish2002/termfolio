"use client";

import { useEffect, useState } from "react";

import { FaCheck, FaClipboard } from "react-icons/fa6";

import cn from "@/utils/cn";

const CopyToClipboardButton = ({ content }: { content: string }) => {
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		if (clicked) {
			const timer = setTimeout(() => setClicked(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [clicked]);

	const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		await navigator.clipboard.writeText(content);
		setClicked(true);
	};

	return (
		<button
			className={cn(
				"text-tokyo-night-foreground",
				// "dark:text-tokyo-night-foreground",
				"bg-tokyo-night-code-background",
				"rounded p-2"
			)}
			aria-label={clicked ? "Copied!" : "Copy to Clipboard"}
			onClick={onClick}
		>
			{clicked ? <FaCheck className="fill-tokyo-night-green" /> : <FaClipboard />}
		</button>
	);
};

export default CopyToClipboardButton;
