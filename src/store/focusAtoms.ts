import { atom } from "jotai";

export const focusedDivAtom = atom(0);
export const focusedItemsAtom = atom<Map<number, number>>(new Map());
export const registeredDivsAtom = atom<Map<number, React.RefObject<HTMLDivElement | null>>>(
  new Map()
);
export const registeredItemsAtom = atom<
  Map<number, Map<number, React.RefObject<HTMLDivElement | null>>>
>(new Map());
export const scrollableDivAtom = atom<{ current: HTMLElement } | undefined>(undefined);
