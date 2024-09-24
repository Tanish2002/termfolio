'use client';
// RoutesListItemClient.tsx
import React, { useMemo } from 'react';
import { atom, useAtomValue } from 'jotai'; // or the correct import based on your atom library
import { RoutesListItemClientProps } from './types';
import { selectAtom } from 'jotai/utils';
import { focusedDivAtom, focusedItemsAtom } from '@/store/focusAtoms';
import NavigableItem from '@/components/NavigableComponents/NavigableItem/NavigableItem';

const RoutesListItemClient: React.FC<RoutesListItemClientProps> = ({ divIndex, routesItem, itemIndex }) => {
  const isFocused = useAtomValue(useMemo(() => selectAtom(
    atom((get) => ({
      focusedDiv: get(focusedDivAtom),
      focusedItems: get(focusedItemsAtom),
    })),
    ({ focusedDiv, focusedItems }) =>
      focusedDiv === divIndex && focusedItems[divIndex] === itemIndex
  ), [divIndex, itemIndex]));

  return (
    <NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={routesItem.path}>
      <li
        className={`p-0.5 w-full transition-colors flex justify-between ${isFocused
          ? 'bg-tokyo-night-dark-blue'
          : 'hover:bg-tokyo-night-selection/20'
          }`}
      >
        <p>{routesItem.name}</p>
        <p className={isFocused ? 'text-tokyo-night-orange' : 'text-tokyo-night-comment'}>{routesItem.path}</p>
      </li>
    </NavigableItem>
  );
};

export default React.memo(RoutesListItemClient);
