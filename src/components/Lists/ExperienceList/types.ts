export interface ExperienceListItemProps {
	jobTitle: string;
	companyName: string; // Name or description of the tech stack item
	slug: string;
}

export interface ExperienceListProps {
	divIndex: number; // Index of the div for focus tracking
}

export interface ExperienceListItemClientProps {
	experienceItem: ExperienceListItemProps; // Single tech stack item
	divIndex: number; // Index of the div for focus tracking
	itemIndex: number; // Index of the item in the list
}
