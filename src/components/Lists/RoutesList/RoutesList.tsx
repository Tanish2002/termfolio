import React from "react";

import RoutesListItemClient from "./RoutesListItemClient";
import { RoutesListItemProps, RoutesListProps } from "./types";

const items: RoutesListItemProps[] = [
	{ name: "About", path: "/" },
	{ name: "Experience", path: "/experience" },
	{ name: "Projects", path: "/project" },
	{ name: "Blog", path: "/blog" }
];

const RoutesList: React.FC<RoutesListProps> = async ({ divIndex }) => {
	return (
		<ul className="w-full space-y-2">
			{items.map((item, itemIndex) => (
				<RoutesListItemClient
					key={`routes-item-${itemIndex}`}
					divIndex={divIndex}
					routesItem={item}
					itemIndex={itemIndex}
				/>
			))}
		</ul>
	);
};

export default React.memo(RoutesList);
