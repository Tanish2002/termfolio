"use client";

import React from "react";

import { useAtomValue } from "jotai";

import BorderBox from "@/components/BorderBox/BorderBox";
import { BaseListItemClient } from "@/components/Lists/BaseListItemClient";
import { BaseListItem } from "@/components/Lists/types";
import { fontAtom } from "@/store/fontAtom";
import { themeAtom } from "@/store/themeAtoms";

export const dynamic = "force-static";

export default React.memo(function Settings() {
  const theme = useAtomValue(themeAtom);
  const font = useAtomValue(fontAtom);
  const items: BaseListItem[] = [
    {
      leftContent: "Font",
      rightContent: font,
      href: "/settings/font"
    },
    {
      leftContent: "Theme",
      rightContent: theme ?? "system",
      href: "/settings/theme"
    }
  ];
  return (
    <BorderBox
      texts={[
        {
          textYPosition: "top",
          textXPosition: "left",
          text: "settings"
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
});

// can't use baselist since it imports DynamicIcon and that gets bunded to client bundle due to 'use client' used in this component
// return (
//   <BaseList
//     divIndex={2}
//     items={items}
//     boxText="settings"
//   />
// );
