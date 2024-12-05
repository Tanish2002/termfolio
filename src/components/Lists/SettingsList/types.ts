export interface SettingsListItemProps {
	name: string;
	settingsKey: string;
	settingsValue: string;
}

export interface SettingsListProps {
	divIndex: number; // Index of the div for focus tracking
	settingsKey: string; // keyForPage e.g "theme" or "font"
}

export interface SettingsListItemClientProps {
	settingsItem: SettingsListItemProps; // Single tech stack item
	pageKey: string; // keyForPage e.g "theme" or "font"
	divIndex: number; // Index of the div for focus tracking
	itemIndex: number; // Index of the item in the list
}
