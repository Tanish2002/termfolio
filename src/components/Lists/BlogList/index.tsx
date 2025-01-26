"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";

import { BaseListItemClient } from "../BaseListItemClient";
import { BaseListItem } from "../types";

interface BlogListProps {
  publishedPosts: BaseListItem[];
  archivedPosts: BaseListItem[];
}

function BlogList({ publishedPosts, archivedPosts }: BlogListProps) {
  const searchParams = useSearchParams();

  const status = useMemo(() => {
    const paramStatus = searchParams.get("status");
    return paramStatus === "archived" ? ("archived" as const) : ("published" as const);
  }, [searchParams]);

  const items = status === "archived" ? archivedPosts : publishedPosts;

  return (
    <BorderBox
      texts={[
        {
          textYPosition: "top",
          textXPosition: "left",
          text: status === "archived" ? "blog - [archived]" : "blog"
        }
      ]}
    >
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

export default React.memo(BlogList);

// can't use baselist since it imports DynamicIcon and that gets bunded to client bundle due to 'use client' used in this component
// return (
//   <BaseList
//     divIndex={2}
//     items={items}
//     boxText={status === "archived" ? "blog - [archived]" : "blog"}
//   />
// );
