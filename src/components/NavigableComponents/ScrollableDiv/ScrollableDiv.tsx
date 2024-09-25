import React from "react";

import ScrollableDivClient from "./ScrollableDivClient";

const ScrollableDiv: React.FC<React.PropsWithChildren<{ className: string; index: number }>> = ({
	children,
	className,
	index
}) => (
	<ScrollableDivClient className={className} index={index}>
		{children}
	</ScrollableDivClient>
);

export default React.memo(ScrollableDiv);
