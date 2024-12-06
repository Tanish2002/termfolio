import React from "react";

import cn from "@/utils/cn";

const Span = (
	props: React.JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLSpanElement> &
		React.HTMLAttributes<HTMLSpanElement>
) => {
	return (
		<span
			className={cn(
				"bg-tokyo-night-code-background text-[var(--shiki-light)]",
				"dark:text-[var(--shiki-dark)]"
			)}
			{...props}
		>
			{props.children}
		</span>
	);
};

export default Span;
