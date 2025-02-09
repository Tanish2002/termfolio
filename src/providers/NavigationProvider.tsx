"use client";

import React, { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import useIsMobile from "@/hooks/useIsMobile";
import {
  activeDivAtom,
  activeItemsAtom,
  registeredDivsAtom,
  registeredItemsAtom,
  scrollableStateAtom
} from "@/store/navigation/atom";
import { findScrollableElement } from "@/utils/scrollUtils";
import { throttle } from "@/utils/throttle";

const NavigationProvider: React.FC = () => {
  const [activeDiv, activeDivDispatcher] = useAtom(activeDivAtom);
  const [activeItem, activeItemDispatcher] = useAtom(activeItemsAtom);
  const registeredDivs = useAtomValue(registeredDivsAtom);
  const registeredItems = useAtomValue(registeredItemsAtom);
  const scrollableState = useAtomValue(scrollableStateAtom);
  const scrollableDiv = scrollableState.scrollableDiv;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = throttle((e: KeyboardEvent) => {
      const key = e.key;

      // Check for modifier keys (Ctrl, Alt, Meta/Command)
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return; // Allow browser shortcuts to work normally
      }

      const isNavKey = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "h",
        "j",
        "k",
        "l"
      ].includes(key);
      const isScrollKey = ["PageUp", "PageDown"].includes(key);

      if (!isNavKey && !isScrollKey) return;
      e.preventDefault();

      if (isScrollKey && scrollableDiv?.current) {
        const scrollAmount = scrollableDiv.current.clientHeight * 0.1;
        scrollableDiv.current.scrollBy({
          top: key === "PageUp" ? -scrollAmount : scrollAmount,
          behavior: "smooth"
        });
        return;
      }

      const isVertical = ["ArrowUp", "ArrowDown", "j", "k"].includes(key);
      const isUp = ["ArrowUp", "k"].includes(key);
      const isRight = ["ArrowRight", "l"].includes(key);

      if (isVertical) {
        const divItems = registeredItems.get(activeDiv);
        if (!divItems?.size) {
          const divRef = registeredDivs.get(activeDiv);
          if (divRef?.current) {
            const scrollableElement = findScrollableElement(divRef.current);
            if (scrollableElement) {
              scrollableElement.scrollBy({
                top: isUp
                  ? -scrollableElement.clientHeight * 0.1
                  : scrollableElement.clientHeight * 0.1,
                behavior: "smooth"
              });
            }
          }
          return;
        }

        const currentItem = activeItem.get(activeDiv) || 0;
        const newItem = isUp
          ? Math.max(0, currentItem - 1)
          : Math.min(divItems.size - 1, currentItem + 1);

        activeItemDispatcher({
          type: "CHANGE_ITEM",
          payload: { divIndex: activeDiv, itemIndex: newItem }
        });
      } else {
        const divs = Array.from(registeredDivs.keys()).sort((a, b) => a - b);
        const currentIndex = divs.indexOf(activeDiv);
        const newIndex = isRight
          ? (currentIndex + 1) % divs.length
          : (currentIndex - 1 + divs.length) % divs.length;

        activeDivDispatcher({ type: "CHANGE_DIV", payload: divs[newIndex] });
      }
    }, 100);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeDiv,
    activeItem,
    scrollableDiv,
    registeredDivs,
    registeredItems,
    activeItemDispatcher,
    activeDivDispatcher,
    isMobile
  ]);

  return null;
};

export default React.memo(NavigationProvider);
