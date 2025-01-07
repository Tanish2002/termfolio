"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getArchivedPosts, getPublishedPosts } from "./getPostsAction";
import BorderBox from "@/components/BorderBox/BorderBox";
import { BaseListItemClient } from "../BaseListItemClient";
import { BaseListItem } from "../types";

export function BlogList({ initialItems }) {
  const searchParams = useSearchParams();
  const [items, setItems] = useState(initialItems);
  const status = (
    ["published", "archived"].includes(searchParams.get("status") || "")
      ? searchParams.get("status")!
      : "published"
  ) as "published" | "archived";

  useEffect(() => {
    if (status === "archived") getArchivedPosts().then(setItems);
    if (status === "published") getPublishedPosts().then(setItems);
  }, [status]);

  // can't use baselist since it imports DynamicIcon and that gets bunded to client bundle due to 'use client' used in this component
  // return (
  //   <BaseList
  //     divIndex={2}
  //     items={items}
  //     boxText={status === "archived" ? "blog - [archived]" : "blog"}
  //   />
  // );
  return (
    <BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: status === "archived" ? "blog - [archived]" : "blog" }]}>
      <ul className="w-full space-y-2">
        {items.map((item: BaseListItem, itemIndex: number) => (
          <BaseListItemClient
            key={item.id || `list-item-${itemIndex}`}
            divIndex={2}
            item={{
              ...item,
              rightContent: item.rightContent as string
            }}
            itemIndex={itemIndex}
          />
        ))}
      </ul>
    </BorderBox>
  );
}
