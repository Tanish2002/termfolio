'use client';

import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { focusedDivAtom, focusedItemsAtom, scrollableDivAtom, totalDivsAtom as registeredDivsAtom } from '@/store/focusAtoms';
import { findScrollableElement } from '@/utils/scrollUtils';
import { selectAtom } from 'jotai/utils';
import { NavigableFocusContext } from '../NavigableFocusContext';

interface ScrollableDivProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

const ScrollableDivClient: React.FC<ScrollableDivProps> = ({ children, className, index }) => {
  const setScrollableDiv = useSetAtom(scrollableDivAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registerDiv = useSetAtom(registeredDivsAtom);
  const isFocused = useAtomValue(useMemo(() => selectAtom(focusedDivAtom, (focused) => focused === index), [index]))

  useEffect(() => {
    registerDiv((prev) => new Map(prev).set(index, containerRef));

    return () => {
      registerDiv((prev) => {
        const updatedDivs = new Map(prev);
        updatedDivs.delete(index);
        return updatedDivs;
      });
    };
  }, [index, registerDiv, containerRef]);

  const handleClick = useCallback(() => {
    setFocusedDiv(index);
    setFocusedItems((prev) => ({ ...prev, [index]: prev[index] || 0 }));
    containerRef.current?.focus()
  }, [setFocusedDiv, setFocusedItems, containerRef, index]);

  useEffect(() => {
    const updateScrollableDiv = () => {
      if (containerRef.current) {
        const scrollableElement = findScrollableElement(containerRef.current);
        setScrollableDiv(scrollableElement ? { current: scrollableElement } : undefined);
      }
    };

    updateScrollableDiv();

    // Use ResizeObserver to detect changes in content size
    const resizeObserver = new ResizeObserver(updateScrollableDiv);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      setScrollableDiv(undefined);
    };
  }, [setScrollableDiv]);

  return (
    <NavigableFocusContext.Provider value={isFocused}>
      <div
        ref={containerRef}
        className={className}
        onClick={handleClick}
        tabIndex={0}
      >
        {children}
      </div>
    </NavigableFocusContext.Provider>
  );
};

export default React.memo(ScrollableDivClient);
