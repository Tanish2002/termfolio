import BorderBox from "@/components/BorderBox";
import ListSkeleton from "@/components/ListSkeleton";
import React from "react";

async function BlogLoading() {
  return (
    <BorderBox
      texts={[{ textYPosition: 'top', textXPosition: 'left', text: 'blog' }]}
    >
      <ListSkeleton />
    </BorderBox>

  )
}

export default React.memo(BlogLoading)
