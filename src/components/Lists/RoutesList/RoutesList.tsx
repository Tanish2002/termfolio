import React from "react";

import { BaseList } from "../BaseList";
import { BaseListItem } from "../types";

const items: BaseListItem[] = [
	{ leftContent: "About", rightContent: "/", href: "/" },
	{ leftContent: "Experience", rightContent: "/experience", href: "/experience" },
	{ leftContent: "Projects", rightContent: "/projects", href: "/projects" },
	{ leftContent: "Blog", rightContent: "/blog", href: "/blog" },
	{ leftContent: "Settings", rightContent: "/settings", href: "/settings" }
];

const RoutesList: React.FC<{ divIndex: number }> = async ({ divIndex }) => {
	return <BaseList divIndex={divIndex} items={items} boxText="pages" />;
};

export default React.memo(RoutesList);
