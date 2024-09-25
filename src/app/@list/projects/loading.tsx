import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";

async function ProjectsLoading() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "projects" }]}>
			<ListSkeleton />
		</BorderBox>
	);
}

export default React.memo(ProjectsLoading);
