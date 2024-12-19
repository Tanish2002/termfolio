import React from "react";

import cn from "@/utils/cn";

const Span: React.FC<React.HTMLAttributes<HTMLSpanElement> & { style?: React.CSSProperties }> = (
	props
) => {
	const { style, ...restProps } = props;

	return (
		<span
			className={cn("text-[var(--shiki-light)] dark:text-[var(--shiki-dark)]")}
			style={{
				...style
			}}
			{...restProps}
		/>
	);
};
export default Span;
