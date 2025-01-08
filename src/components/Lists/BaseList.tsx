import React from "react";

import BorderBox from "../BorderBox/BorderBox";
import DynamicIcon from "../DynamicIcon";
import { BaseListItemClient } from "./BaseListItemClient";
import { BaseListItem, BaseListProps } from "./types";

export async function BaseList<T extends BaseListItem>({
  divIndex,
  items,
  boxText
}: BaseListProps<T>) {
  return (
    <BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: boxText }]}>
      <ul className="w-full space-y-2">
        {items.map((item, itemIndex) => (
          <BaseListItemClient
            key={item.id || `list-item-${itemIndex}`}
            divIndex={divIndex}
            item={{
              ...item,
              rightContent:
                typeof item.rightContent !== "string" &&
                item.rightContent !== null &&
                "iconName" in item.rightContent ? (
                  <DynamicIcon
                    className="text-inherit"
                    icon={item.rightContent?.iconName.trim()}
                    iconFamily={item.rightContent?.iconFamily}
                  />
                ) : (
                  item.rightContent
                )
            }}
            itemIndex={itemIndex}
          />
        ))}
      </ul>
    </BorderBox>
  );
}
