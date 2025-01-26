"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { useAtomValue } from "jotai";

import { useMobileNavbarOpen } from "@/components/MobileNavbar/MobileNavbarContext";
import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import useIsMobile from "@/hooks/useIsMobile";
import { createItemFocusSelector } from "@/store/navigation/selectors";
import cn from "@/utils/cn";

import { BaseListItem, BaseListItemClientProps } from "./types";

export function BaseListItemClient<T extends BaseListItem>({
  divIndex,
  item,
  itemIndex
}: BaseListItemClientProps<T>) {
  const setIsOpen = useMobileNavbarOpen();
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const isFocused = useAtomValue(
    useMemo(() => createItemFocusSelector(divIndex, itemIndex), [divIndex, itemIndex])
  );

  const isSelected = item.href
    ? item.href === "/" && pathName !== "/"
      ? false
      : pathName.includes(item.href)
    : false;

  const content = (
    <div
      className={cn(
        "flex w-full items-center justify-between p-0.5 transition-colors",
        isFocused
          ? "bg-tokyo-night-dark-blue/80 text-tokyo-night-code-background"
          : "hover:bg-tokyo-night-selection/20"
      )}
      onClick={() => {
        if (isMobile && setIsOpen) {
          setIsOpen((prev) => !prev);
        }
      }}
    >
      <p className="m-0.5">{item.leftContent}</p>
      {item.rightContent && (
        <div
          className={cn(
            isFocused || isSelected ? "text-tokyo-night-orange" : "text-tokyo-night-comment",
            "m-0.5"
          )}
        >
          {item.rightContent}
        </div>
      )}
    </div>
  );

  if (item.href) {
    return (
      <NavigableItem
        divIndex={divIndex}
        itemIndex={itemIndex}
        href={item.href}
        label={item.leftContent}
      >
        {content}
      </NavigableItem>
    );
  }

  return (
    <NavigableItem divIndex={divIndex} itemIndex={itemIndex} label={item.leftContent}>
      {content}
    </NavigableItem>
  );
}
