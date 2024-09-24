'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { focusedDivAtom, focusedItemsAtom, totalDivsAtom as registeredDivsAtom } from '@/store/focusAtoms';
import { selectAtom } from 'jotai/utils';
import { NavigableFocusContext } from '../NavigableFocusContext';

const NavigableDivClient: React.FC<{ index: number; children: React.ReactNode; className: string }> = ({ index, children, className }) => {
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registerDiv = useSetAtom(registeredDivsAtom);
  const isFocused = useAtomValue(useMemo(() => selectAtom(focusedDivAtom, (focused) => focused === index), [index]));

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerDiv((prev) => new Map(prev).set(index, divRef));

    return () => {
      registerDiv((prev) => {
        const updatedDivs = new Map(prev);
        updatedDivs.delete(index);
        return updatedDivs;
      });
    };
  }, [index, registerDiv]);

  const handleClick = useCallback(() => {
    setFocusedDiv(index);
    setFocusedItems((prev) => ({ ...prev, [index]: prev[index] || 0 }));
    divRef.current?.focus();
  }, [setFocusedDiv, setFocusedItems, divRef, index]);

  return (
    <NavigableFocusContext.Provider value={isFocused}>
      <div ref={divRef} onClick={handleClick} className={className}>
        {children}
      </div>
    </NavigableFocusContext.Provider>
  );
};

export default React.memo(NavigableDivClient);
