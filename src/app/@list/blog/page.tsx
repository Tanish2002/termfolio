import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import BlogList from "@/components/Lists/BlogList/BlogList";

async function Blog({
	searchParams
}: {
	searchParams: Promise<{ status: "published" | "archived" }>;
}) {
	const status = ["published", "archived"].includes((await searchParams).status)
		? (await searchParams).status
		: "published";
	return (
		<BorderBox
			texts={[
				{
					textYPosition: "top",
					textXPosition: "left",
					text: status === "archived" ? "blog - [archived]" : "blog"
				}
			]}
		>
			<BlogList divIndex={2} status={status} />
		</BorderBox>
	);
}

export default Blog;
