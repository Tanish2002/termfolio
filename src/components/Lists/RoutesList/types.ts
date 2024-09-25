export interface RoutesListItemProps {
	name: string;
	path: string;
}

export interface RoutesListProps {
	divIndex: number; // Index of the div for focus tracking
}

export interface RoutesListItemClientProps {
	routesItem: RoutesListItemProps; // Single tech stack item
	divIndex: number; // Index of the div for focus tracking
	itemIndex: number; // Index of the item in the list
}
