import React from "react";

import { BaseListSkeleton } from "@/components/Lists/BaseListSkeleton";

async function ExperienceLoading() {
	return <BaseListSkeleton boxText="experience" />;
}

export default React.memo(ExperienceLoading);
