import { atom } from 'jotai';
import React from 'react';

export const focusedDivAtom = atom(0);
export const focusedItemsAtom = atom<Record<number, number>>({}); // Record<divIndex, [itemIndex, href/link for item]>
export const totalDivsAtom = atom<Map<number, React.RefObject<HTMLDivElement>>>(new Map());
export const itemCountsAtom = atom<Map<number, Map<number, React.RefObject<HTMLDivElement>>>>(new Map());
export const scrollableDivAtom = atom<{ current: HTMLElement } | undefined>(undefined);
