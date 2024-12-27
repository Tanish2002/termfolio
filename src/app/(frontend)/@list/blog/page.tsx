import React from "react";

import { BlogList } from "@/components/Lists/BlogList";
import { getArchivedPosts, getPublishedPosts } from "@/components/Lists/BlogList/getPostsAction";

export const dynamic = "force-dynamic"; // keep this dynamic

export default async function Blog({ searchParams }: { searchParams: Promise<{ status: "published" | "archived" }> }) {
  const status = (await searchParams).status;
  const initialItems = status === "archived" ? await getArchivedPosts() : await getPublishedPosts();
  return <BlogList initialItems={initialItems} />;
}
