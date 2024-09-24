'use client';
// TechStackListItemClient.tsx
import React, { useMemo } from 'react';
import { atom, useAtomValue } from 'jotai'; // or the correct import based on your atom library
import { TechStackListItemClientProps } from './types';
import { selectAtom } from 'jotai/utils';
import { focusedDivAtom, focusedItemsAtom } from '@/store/focusAtoms';
import NavigableItem from '@/components/NavigableComponents/NavigableItem/NavigableItem';

const TechStackListItemClient: React.FC<TechStackListItemClientProps> = ({ divIndex, techStackItem, itemIndex, icons }) => {
  const isFocused = useAtomValue(useMemo(() => selectAtom(
    atom((get) => ({
      focusedDiv: get(focusedDivAtom),
      focusedItems: get(focusedItemsAtom),
    })),
    ({ focusedDiv, focusedItems }) =>
      focusedDiv === divIndex && focusedItems[divIndex] === itemIndex
  ), [divIndex, itemIndex]));

  return (
    <NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={techStackItem.slug}>
      <li
        className={`p-0.5 w-full transition-colors flex justify-between ${isFocused
          ? 'bg-tokyo-night-dark-blue'
          : 'hover:bg-tokyo-night-selection/20'
          }`}
      >
        <p>{techStackItem.item}</p>
        <div className={isFocused ? 'text-tokyo-night-orange' : ''}>{icons[itemIndex]}</div>
      </li>
    </NavigableItem>
  );
};

export default TechStackListItemClient;
