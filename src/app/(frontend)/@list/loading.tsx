import React from "react";

import { BaseListSkeleton } from "@/components/Lists/BaseListSkeleton";

async function ExperienceLoading() {
  return <BaseListSkeleton boxText="techstack" />;
}

export default React.memo(ExperienceLoading);
