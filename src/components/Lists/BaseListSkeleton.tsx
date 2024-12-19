import React from "react";

import BorderBox from "../BorderBox/BorderBox";

interface BaseListSkeletonProps {
	count?: number;
	boxText: string;
}

export const BaseListSkeleton: React.FC<BaseListSkeletonProps> = ({ count = 10, boxText }) => {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: boxText }]}>
			<ul className="w-full space-y-2">
				{Array.from({ length: count }).map((_, index) => (
					<li
						key={`skeleton-item-${index}`}
						className="flex w-full animate-pulse justify-between p-0.5 transition-colors"
					>
						<div className="h-4 w-1/3 rounded bg-tokyo-night-comment"></div>
						<div className="h-4 w-1/4 rounded bg-tokyo-night-comment"></div>
					</li>
				))}
			</ul>
		</BorderBox>
	);
};
