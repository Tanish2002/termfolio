"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useAtomValue, useSetAtom } from "jotai";

import { activeDivAtom, registeredDivsAtom, scrollableStateAtom } from "@/store/navigation/atom";
import { createDivFocusSelector } from "@/store/navigation/selectors";
import { findScrollableElement } from "@/utils/scrollUtils";

import { NavigableFocusContext } from "../NavigableFocusContext";

interface NavigableDivProps {
  index: number;
  children: React.ReactNode;
  className: string;
  label?: string;
  isScrollable?: boolean;
}

const NavigableDivClient: React.FC<NavigableDivProps> = ({
  index,
  children,
  className,
  label,
  isScrollable = false
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const activeDivDispatcher = useSetAtom(activeDivAtom);
  const registeredDivsDispatcher = useSetAtom(registeredDivsAtom);
  const scrollableDivDispatcher = useSetAtom(scrollableStateAtom);
  const isFocused = useAtomValue(useMemo(() => createDivFocusSelector(index), [index]));

  useEffect(() => {
    registeredDivsDispatcher({
      type: "REGISTER_DIV",
      payload: { index, ref: divRef }
    });

    return () => {
      registeredDivsDispatcher({ type: "UNREGISTER_DIV", payload: index });
    };
  }, [index, registeredDivsDispatcher]);

  useEffect(() => {
    if (!isScrollable) return;

    const updateScrollableDiv = () => {
      if (divRef.current) {
        const scrollableElement = findScrollableElement(divRef.current);
        scrollableDivDispatcher({
          type: "SET_SCROLLABLE_DIV",
          payload: {
            index,
            element: scrollableElement || undefined
          }
        });
      }
    };

    updateScrollableDiv();
    const resizeObserver = new ResizeObserver(updateScrollableDiv);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      scrollableDivDispatcher({
        type: "SET_SCROLLABLE_DIV",
        payload: { index, element: undefined }
      });
    };
  }, [scrollableDivDispatcher, index, isScrollable]);

  const handleClick = useCallback(() => {
    activeDivDispatcher({ type: "CHANGE_DIV", payload: index });
  }, [activeDivDispatcher, index]);

  return (
    <NavigableFocusContext.Provider value={isFocused}>
      <div
        ref={divRef}
        role={isScrollable ? "region" : "navigation"}
        aria-label={label || `${isScrollable ? "Scrollable" : "Navigation"} section ${index}`}
        aria-selected={isScrollable ? undefined : isFocused}
        className={className}
        onClick={handleClick}
        onTouchStart={handleClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
      >
        <div
          role={isScrollable ? "main" : "list"}
          aria-label={`${isScrollable ? "Scrollable content" : "Navigation items"} for ${label || `section ${index}`}`}
          className="h-full w-full"
        >
          {children}
        </div>
      </div>
    </NavigableFocusContext.Provider>
  );
};

export default React.memo(NavigableDivClient);
