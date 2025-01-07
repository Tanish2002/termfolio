"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import React from "react";

import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";

import { focusedDivAtom, focusedItemsAtom, registeredItemsAtom } from "@/store/focusAtoms";

const NavigableItemClient: React.FC<{
  divIndex: number;
  itemIndex: number;
  href?: string;
  children: React.ReactNode;
}> = ({ divIndex, itemIndex, href, children }) => {
  const router = useRouter();
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registerItem = useSetAtom(registeredItemsAtom);
  const isFocused = useAtomValue(
    useMemo(
      () =>
        selectAtom(focusedItemsAtom, (focusedItems) => focusedItems.get(divIndex) === itemIndex),
      [divIndex, itemIndex]
    )
  );

  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    registerItem((prev) => {
      const updatedDivs = new Map(prev);
      const itemsInDiv = updatedDivs.get(divIndex) || new Map();
      itemsInDiv.set(itemIndex, itemRef);
      updatedDivs.set(divIndex, itemsInDiv);
      return updatedDivs;
    });

    return () => {
      registerItem((prev) => {
        const updatedDivs = new Map(prev);
        const itemsInDiv = updatedDivs.get(divIndex);
        if (itemsInDiv) {
          itemsInDiv.delete(itemIndex);
          if (itemsInDiv.size > 0) {
            updatedDivs.set(divIndex, itemsInDiv);
          } else {
            updatedDivs.delete(divIndex);
          }
        }
        return updatedDivs;
      });
    };
  }, [divIndex, itemIndex, itemRef, registerItem]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && isFocused && href) {
        router.push(href);
      }
    },
    [href, isFocused, router]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, handleKeyDown]);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    }
  }, [isFocused]);

  const handleClick = useCallback(() => {
    setFocusedDiv(divIndex);
    setFocusedItems((prev) => new Map(prev).set(divIndex, itemIndex));
    itemRef.current?.focus();
  }, [setFocusedItems, setFocusedDiv, itemRef, divIndex, itemIndex]);

  return (
    <li ref={itemRef} tabIndex={0} onClick={handleClick} onTouchStart={handleClick}>
      {href ? <Link href={href}>{children}</Link> : children}
    </li>
  );
};

export default React.memo(NavigableItemClient);
