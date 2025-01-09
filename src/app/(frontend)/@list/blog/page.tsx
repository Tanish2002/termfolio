// app/blog/page.tsx
import React from "react";
import BlogList from "@/components/Lists/BlogList";
import { getArchivedPosts, getPublishedPosts } from "@/components/Lists/BlogList/getPostsAction";

export const dynamic = "force-static";

export default async function Blog() {
  const [publishedPosts, archivedPosts] = await Promise.all([
    getPublishedPosts(),
    getArchivedPosts()
  ]);

  return (
    <BlogList
      publishedPosts={publishedPosts}
      archivedPosts={archivedPosts}
    />
  );
}
