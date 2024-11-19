import React from "react";

import { atom } from "jotai";

export const focusedDivAtom = atom(0);
export const focusedItemsAtom = atom<Record<number, number>>({}); // Record<divIndex, [itemIndex, href/link for item]>
export const registeredDivsAtom = atom<Map<number, React.RefObject<HTMLDivElement | null>>>(
	new Map()
);
export const registeredItemsAtom = atom<
	Map<number, Map<number, React.RefObject<HTMLDivElement | null>>>
>(new Map());
export const scrollableDivAtom = atom<{ current: HTMLElement } | undefined>(undefined);
