'use client';
// ExperienceListItemClient.tsx
import React, { useMemo } from 'react';
import { atom, useAtomValue } from 'jotai'; // or the correct import based on your atom library
import { ExperienceListItemClientProps } from './types';
import { selectAtom } from 'jotai/utils';
import { focusedDivAtom, focusedItemsAtom } from '@/store/focusAtoms';
import NavigableItem from '@/components/NavigableComponents/NavigableItem/NavigableItem';

const ExperienceListItemClient: React.FC<ExperienceListItemClientProps> = ({ divIndex, experienceItem, itemIndex }) => {
  const isFocused = useAtomValue(useMemo(() => selectAtom(
    atom((get) => ({
      focusedDiv: get(focusedDivAtom),
      focusedItems: get(focusedItemsAtom),
    })),
    ({ focusedDiv, focusedItems }) =>
      focusedDiv === divIndex && focusedItems[divIndex] === itemIndex
  ), [divIndex, itemIndex]));

  return (
    <NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={experienceItem.slug}>
      <li
        className={`p-0.5 w-full transition-colors flex justify-between ${isFocused
          ? 'bg-tokyo-night-dark-blue'
          : 'hover:bg-tokyo-night-selection/20'
          }`}
      >
        <p>{experienceItem.jobTitle}</p>
        <p className={isFocused ? 'text-tokyo-night-orange' : 'text-tokyo-night-comment'}>@ {experienceItem.companyName}</p>
      </li>
    </NavigableItem>
  );
};

export default React.memo(ExperienceListItemClient);
