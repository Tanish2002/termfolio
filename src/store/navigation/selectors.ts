import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

import { activeDivAtom, activeItemsAtom } from "./atom";

export const createDivFocusSelector = (index: number) =>
  selectAtom(activeDivAtom, (activeDiv) => activeDiv === index);

export const createItemFocusSelector = (divIndex: number, itemIndex: number) => {
  const divSelector = selectAtom(activeDivAtom, (activeDiv) => activeDiv === divIndex);
  const itemSelector = selectAtom(
    activeItemsAtom,
    (activeItems) => activeItems.get(divIndex) === itemIndex
  );

  return atom((get) => get(divSelector) && get(itemSelector));
};
