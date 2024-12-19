// CodeBlockClient.tsx (Client Component)
"use client";

import React, { useState } from "react";

import { FaCheck, FaClipboard, FaCopy } from "react-icons/fa";

import cn from "@/utils/cn";

// CodeBlockClient.tsx (Client Component)

// CodeBlockClient.tsx (Client Component)

// CodeBlockClient.tsx (Client Component)

type CodeBlockClientProps = {
	codeContent: string;
};
const CopyToClipboardButton = ({ content }: { content: string }) => {
	const [clicked, setClicked] = React.useState(false);

	React.useEffect(() => {
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
		<div data-tip="copy" className="tooltip tooltip-left tooltip-accent">
			<button
				className={cn(
					"text-[var(--shiki-light)]",
					"dark:bg-[var(--shiki-dark-bg)] dark:text-[var(--shiki-dark)]"
				)}
				aria-label={clicked ? "Copied!" : "Copy to Clipboard"}
				onClick={onClick}
			>
				{clicked ? <FaCheck className="fill-tokyo-night-green" /> : <FaClipboard />}
			</button>
		</div>
	);
};

export default function CodeBlockClient({ codeContent }: CodeBlockClientProps) {
	return (
		<div className="absolute right-0 top-4 px-5">
			<CopyToClipboardButton content={codeContent} />
		</div>
	);
}
