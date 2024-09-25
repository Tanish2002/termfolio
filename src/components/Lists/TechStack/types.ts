import React from "react";

import { IconFamily } from "@/components/DynamicIcon";

export interface TechStackListItemProps {
	item: string; // Name or description of the tech stack item
	logo: {
		name: string; // Logo name
		type: IconFamily; // Logo type (icon family)
	};
	slug: string;
}

export interface TechStackListProps {
	divIndex: number; // Index of the div for focus tracking
}

export interface TechStackListItemClientProps {
	techStackItem: TechStackListItemProps; // Single tech stack item
	divIndex: number; // Index of the div for focus tracking
	itemIndex: number; // Index of the item in the list
	icon: React.JSX.Element;
}
