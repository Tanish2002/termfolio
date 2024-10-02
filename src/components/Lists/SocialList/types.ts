import React from "react";

export interface SocialListItemProps {
	socialName: string; // Name or description of the tech stack item
	href: string;
}

export interface SocialListProps {
	divIndex: number; // Index of the div for focus tracking
}

export interface SocialListItemClientProps {
	socialItem: SocialListItemProps; // Single tech stack item
	divIndex: number; // Index of the div for focus tracking
	itemIndex: number; // Index of the item in the list
	icon: React.JSX.Element;
}
