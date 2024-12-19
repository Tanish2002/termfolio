import React from "react";

import { BaseListSkeleton } from "@/components/Lists/BaseListSkeleton";

async function ProjectLoading() {
	return <BaseListSkeleton boxText="projects" />;
}

export default React.memo(ProjectLoading);
