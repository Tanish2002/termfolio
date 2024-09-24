'use client';
import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { focusedDivAtom, focusedItemsAtom, totalDivsAtom as registeredDivsAtom, itemCountsAtom } from '@/store/focusAtoms';
import { debounce } from 'lodash';
import React from 'react';
import { findScrollableElement } from '@/utils/scrollUtils';

const NavigationProvider: React.FC = () => {
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registeredDivs = useAtomValue(registeredDivsAtom);
  const registeredItems = useAtomValue(itemCountsAtom);

  useEffect(() => {
    const handleKeyDown = debounce((e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'h', 'j', 'k', 'l'].includes(e.key)) {
        e.preventDefault();

        setFocusedDiv((prevFocusedDiv) => {
          let newFocusedDiv = prevFocusedDiv;


          switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'h':
            case 'l':
              const sortedKeys = Array.from(registeredDivs.keys()).sort((a, b) => a - b);
              const currentIndex = sortedKeys.indexOf(prevFocusedDiv);
              newFocusedDiv = ["ArrowRight", "l"].includes(e.key)
                ? sortedKeys[(currentIndex + 1) % sortedKeys.length]
                : sortedKeys[(currentIndex - 1 + sortedKeys.length) % sortedKeys.length]; // ArrowLeft
              break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'k':
            case 'j':
              const divItems = registeredItems.get(prevFocusedDiv);
              if (divItems && divItems.size > 0) {
                // Handle navigation between items
                setFocusedItems((prev) => {
                  const currentItem = prev[prevFocusedDiv] || 0;
                  const maxItem = divItems.size - 1;
                  const newItem = ["ArrowUp", "k"].includes(e.key)
                    ? Math.max(0, currentItem - 1)
                    : Math.min(maxItem, currentItem + 1);

                  const itemRef = divItems.get(newItem);
                  if (itemRef?.current) {
                    // itemRef.current.focus();
                  }

                  return { ...prev, [prevFocusedDiv]: newItem };
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
                      behavior: 'smooth',
                    });
                  }
                }
              }
              return prevFocusedDiv;
          }

          if (newFocusedDiv !== prevFocusedDiv) {
            const divRef = registeredDivs.get(newFocusedDiv);
            if (divRef?.current) {
              divRef.current.focus();
            }

            setFocusedItems((prev) => {
              const newItemIndex = prev[newFocusedDiv] || 0;
              const divItems = registeredItems.get(newFocusedDiv);
              const itemRef = divItems?.get(newItemIndex);

              if (itemRef?.current) {
                // itemRef.current.focus();
              }

              return {
                ...prev,
                [newFocusedDiv]: newItemIndex,
              };
            });
          }

          return newFocusedDiv;
        });
      }
    }, 100);

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setFocusedDiv, setFocusedItems, registeredDivs, registeredItems]);

  return <></>;
};

export default React.memo(NavigationProvider);
