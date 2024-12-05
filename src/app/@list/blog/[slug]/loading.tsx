import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";

async function BlogLoading() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "blog" }]}>
			<ListSkeleton />
		</BorderBox>
	);
}

export default React.memo(BlogLoading);
