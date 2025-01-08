"use client";

import { useEffect } from "react";
import React from "react";

import { useAtomValue, useSetAtom } from "jotai";
import { debounce } from "underscore";

import useIsMobile from "@/hooks/useIsMobile";
import {
  focusedDivAtom,
  focusedItemsAtom,
  registeredDivsAtom,
  registeredItemsAtom
} from "@/store/focusAtoms";
import { findScrollableElement } from "@/utils/scrollUtils";

const NavigationProvider: React.FC = () => {
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registeredDivs = useAtomValue(registeredDivsAtom);
  const registeredItems = useAtomValue(registeredItemsAtom);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = debounce((e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "h", "j", "k", "l"].includes(e.key)) {
        e.preventDefault();

        setFocusedDiv((prevFocusedDiv) => {
          let newFocusedDiv = prevFocusedDiv;

          switch (e.key) {
            case "ArrowLeft":
            case "ArrowRight":
            case "h":
            case "l": {
              const sortedKeys = Array.from(registeredDivs.keys()).sort((a, b) => a - b);
              const currentIndex = sortedKeys.indexOf(prevFocusedDiv);
              newFocusedDiv = ["ArrowRight", "l"].includes(e.key)
                ? sortedKeys[(currentIndex + 1) % sortedKeys.length]
                : sortedKeys[(currentIndex - 1 + sortedKeys.length) % sortedKeys.length]; // ArrowLeft
              break;
            }
            case "ArrowUp":
            case "ArrowDown":
            case "k":
            case "j": {
              const divItems = registeredItems.get(prevFocusedDiv);
              if (divItems && divItems.size > 0) {
                // Handle navigation between items
                setFocusedItems((prev) => {
                  const currentItem = prev.get(prevFocusedDiv) || 0;
                  const maxItem = divItems.size - 1;
                  const newItem = ["ArrowUp", "k"].includes(e.key)
                    ? Math.max(0, currentItem - 1)
                    : Math.min(maxItem, currentItem + 1);

                  // const itemRef = divItems.get(newItem);
                  // if (itemRef?.current) {
                  //   itemRef.current.focus();
                  // }

                  return new Map(prev).set(prevFocusedDiv, newItem);
                });
              } else {
                // Scroll the NavigableDiv if it has no items and scrollableElement found
                const divRef = registeredDivs.get(prevFocusedDiv);
                if (divRef?.current) {
                  const scrollableElement = findScrollableElement(divRef.current);
                  if (scrollableElement) {
                    const scrollAmount = scrollableElement.clientHeight * 0.1; // Scroll by 10% of the height
                    scrollableElement.scrollBy({
                      top: ["ArrowUp", "k"].includes(e.key) ? -scrollAmount : scrollAmount,
                      behavior: "smooth"
                    });
                  }
                }
              }
              return prevFocusedDiv;
            }
          }

          if (newFocusedDiv !== prevFocusedDiv) {
            // const divRef = registeredDivs.get(newFocusedDiv);
            // if (divRef?.current) {
            //   divRef.current.focus();
            // }

            setFocusedItems((prev) => {
              const newItemIndex = prev.get(newFocusedDiv) || 0;
              const divItems = registeredItems.get(newFocusedDiv);
              const itemRef = divItems?.get(newItemIndex);

              // if (itemRef?.current) {
              //   itemRef.current.focus();
              // }

              return new Map(prev).set(newFocusedDiv, newItemIndex);
            });
          }

          return newFocusedDiv;
        });
      }
    }, 100);

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setFocusedDiv, setFocusedItems, registeredDivs, registeredItems, isMobile]);

  return <></>;
};

export default React.memo(NavigationProvider);
