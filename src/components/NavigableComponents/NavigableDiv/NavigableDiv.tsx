import React from "react";

import NavigableDivClient from "./NavigableDivClient";

const NavigableDiv: React.FC<{
	index: number;
	children: React.ReactNode;
	className: string;
}> = ({ index, children, className }) => (
	<NavigableDivClient index={index} className={className}>
		{children}
	</NavigableDivClient>
);

export default React.memo(NavigableDiv);
