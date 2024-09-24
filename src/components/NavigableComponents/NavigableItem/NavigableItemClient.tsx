'use client';
import { useSetAtom, useAtomValue, atom } from 'jotai';
import { focusedDivAtom, focusedItemsAtom, itemCountsAtom as registeredItemsAtom } from '@/store/focusAtoms';
import { selectAtom } from 'jotai/utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavigableItemClient: React.FC<{ divIndex: number; itemIndex: number; href: string; children: React.ReactNode }> = ({ divIndex, itemIndex, href, children }) => {
  const router = useRouter()
  const setFocusedDiv = useSetAtom(focusedDivAtom);
  const setFocusedItems = useSetAtom(focusedItemsAtom);
  const registerItem = useSetAtom(registeredItemsAtom);
  const isFocused = useAtomValue(useMemo(() => selectAtom(
    atom((get) => ({
      focusedDiv: get(focusedDivAtom),
      focusedItems: get(focusedItemsAtom),
    })),
    ({ focusedDiv, focusedItems }) =>
      focusedDiv === divIndex && focusedItems[divIndex] === itemIndex
  ), [divIndex, itemIndex]));

  const itemRef = useRef<HTMLDivElement>(null);

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
          itemsInDiv.size ? updatedDivs.set(divIndex, itemsInDiv) : updatedDivs.delete(divIndex);
        }
        return updatedDivs;
      });
    };
  }, [divIndex, itemIndex, itemRef, registerItem]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && isFocused) {
      router.push(href)
    }
  }, [href, isFocused, router])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);


  }, [isFocused, handleKeyDown])

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }, [isFocused]);

  const handleClick = useCallback(() => {
    setFocusedDiv(divIndex)
    setFocusedItems((prev) => ({ ...prev, [divIndex]: itemIndex }))
    itemRef.current?.focus()
  }, [setFocusedItems, setFocusedDiv, itemRef, divIndex, itemIndex])

  return (
    <div ref={itemRef} tabIndex={0} onClick={handleClick}>
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default React.memo(NavigableItemClient);
