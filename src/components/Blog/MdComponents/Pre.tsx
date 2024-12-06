"use client";

import React, { useRef } from "react";

import { FaCheck, FaClipboard } from "react-icons/fa";

import { mono } from "@/constants";
import cn from "@/utils/cn";

const CopyToClipboardButton = ({ content }: { content: string }) => {
	const [clicked, setClicked] = React.useState(false);

	React.useEffect(() => {
		if (clicked) {
			const timer = setTimeout(() => setClicked(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [clicked]);

	const onClick = async () => {
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

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
	"data-language"?: string;
}

const Pre = (props: PreProps) => {
	const preRef = useRef<HTMLPreElement>(null);
	const lang = props["data-language"];

	return (
		<div className="relative">
			{lang && (
				<div className="absolute left-1/2 top-1 -translate-x-1/2 transform text-sm text-tokyo-night-orange rounded-t-md bg-[var(--shiki-dark-bg)] px-4 py-1 text-[var(--shiki-dark)]">
					{lang}
				</div>
			)}
			<pre
				ref={preRef}
				className={cn(
					"bg-tokyo-night-code-background text-[var(--shiki-light)]",
					"dark:text-[var(--shiki-dark)]",
					"my-3 overflow-x-auto px-4 pt-8",
					mono.className
				)}
				{...props}
			>
				{props.children}
			</pre>
			<div className="absolute right-0 top-4 px-5">
				<CopyToClipboardButton content={preRef.current?.textContent ?? ""} />
			</div>
		</div>
	);
};

export default Pre;
