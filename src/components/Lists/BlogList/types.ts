export interface BlogListProps {
	divIndex: number;
	status: "published" | "archived";
}

export interface BlogListItemClientProps {
	divIndex: number;
	blogItem: {
		title: string;
		readTime: string;
		slug: string;
	};
	itemIndex: number;
}
