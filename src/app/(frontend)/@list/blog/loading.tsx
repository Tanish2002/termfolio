import React from "react";

import { BaseListSkeleton } from "@/components/Lists/BaseListSkeleton";

async function BlogLoading() {
  return <BaseListSkeleton boxText="blog" />;
}

export default React.memo(BlogLoading);
