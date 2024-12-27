import React from "react";

import { BlogList } from "@/components/Lists/BlogList";
import { getPublishedPosts } from "@/components/Lists/BlogList/getPostsAction";

export const dynamic = "force-static";

export default async function Blog() {
  const initialItems = await getPublishedPosts();
  return <BlogList initialItems={initialItems} />;
}
