import BorderBox from "@/components/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";
import React from "react";

async function ExperienceLoading() {
  return (
    <BorderBox
      texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'experience' }]}
    >
      <ListSkeleton />
    </BorderBox>

  )
}

export default React.memo(ExperienceLoading)
