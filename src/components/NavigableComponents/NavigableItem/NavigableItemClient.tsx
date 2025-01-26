"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { activeDivAtom, activeItemsAtom, registeredItemsAtom } from "@/store/navigation/atom";
import { createItemFocusSelector } from "@/store/navigation/selectors";

const NavigableItemClient: React.FC<{
  divIndex: number;
  itemIndex: number;
  href?: string;
  children: React.ReactNode;
  label?: string;
}> = ({ divIndex, itemIndex, href, children, label }) => {
  const router = useRouter();
  const activeDivDispatcher = useSetAtom(activeDivAtom);
  const activeItemsDispatcher = useSetAtom(activeItemsAtom);
  const registeredItemsDispatcher = useSetAtom(registeredItemsAtom);
  const isFocused = useAtomValue(
    useMemo(() => createItemFocusSelector(divIndex, itemIndex), [divIndex, itemIndex])
  );
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    registeredItemsDispatcher({
      type: "REGISTER_ITEM",
      payload: { divIndex, itemIndex, ref: itemRef }
    });
    return () => {
      registeredItemsDispatcher({
        type: "UNREGISTER_ITEM",
        payload: { divIndex, itemIndex }
      });
    };
  }, [divIndex, itemIndex, registeredItemsDispatcher]);

  const handleClick = useCallback(() => {
    activeDivDispatcher({ type: "CHANGE_DIV", payload: divIndex });
    activeItemsDispatcher({
      type: "CHANGE_ITEM",
      payload: { divIndex, itemIndex }
    });
  }, [activeItemsDispatcher, activeDivDispatcher, divIndex, itemIndex]);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isFocused && href) {
        router.push(href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, href, router]);

  return (
    <li
      ref={itemRef}
      role="listitem"
      aria-label={label || `Navigation item ${itemIndex}`}
      tabIndex={isFocused ? 0 : -1}
      onClick={handleClick}
      onTouchStart={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (href) {
            router.push(href);
          } else {
            handleClick();
          }
        }
      }}
    >
      {href ? (
        <Link href={href} aria-current={isFocused ? "page" : undefined} tabIndex={-1}>
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  );
};

export default React.memo(NavigableItemClient);
