"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BaseList } from "@/components/Lists/BaseList";

import { getArchivedPosts, getPublishedPosts } from "./getPostsAction";

export function BlogList({ initialItems }) {
	const searchParams = useSearchParams();
	const [items, setItems] = useState(initialItems);
	const status = (
		["published", "archived"].includes(searchParams.get("status") || "")
			? searchParams.get("status")!
			: "published"
	) as "published" | "archived";

	useEffect(() => {
		if (status === "archived") getArchivedPosts().then(setItems);
		if (status === "published") getPublishedPosts().then(setItems);
	}, [status]);

	return (
		<BaseList
			divIndex={2}
			items={items}
			boxText={status === "archived" ? "blog - [archived]" : "blog"}
		/>
	);
}
