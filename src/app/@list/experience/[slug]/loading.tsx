import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";

async function ExperienceLoading() {
	return (
		<BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: "experience" }]}>
			<ListSkeleton />
		</BorderBox>
	);
}

export default React.memo(ExperienceLoading);
