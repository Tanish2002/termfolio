import BorderBox from "@/components/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";
import React from "react";

async function ProjectsLoading() {
  return (
    <BorderBox
      texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'projects' }]}
    >
      <ListSkeleton />
    </BorderBox>

  )
}

export default React.memo(ProjectsLoading)
