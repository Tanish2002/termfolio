import { ReactNode } from "react";

import { IconFamily } from "../DynamicIcon";

export interface BaseListItem {
	id?: string;
	leftContent: string;
	rightContent: string | rightContentIcon;
	href?: string;
}

interface rightContentIcon {
	iconName: string;
	iconFamily: IconFamily;
}

export interface BaseListProps<T extends BaseListItem> {
	divIndex: number;
	items: T[];
	boxText: string;
}

export interface BaseListItemClientProps<T extends BaseListItem> {
	divIndex: number;
	item: T & { rightContent: string | ReactNode }; // will only be either string or react node
	itemIndex: number;
}
