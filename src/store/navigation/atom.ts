import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";

const activeDivBaseAtom = atom<number>(0);

export const activeDivAtom = atom(
  (get) => get(activeDivBaseAtom),
  (get, set, action: { type: "CHANGE_DIV"; payload: number }) => {
    if (action.type === "CHANGE_DIV") {
      set(activeDivBaseAtom, action.payload);
      const activeItems = get(activeItemsAtom);
      if (!activeItems.has(action.payload)) {
        set(activeItemsAtom, {
          type: "CHANGE_ITEM",
          payload: {
            divIndex: action.payload,
            itemIndex: 0
          }
        });
      }
    }
  }
);

export const activeItemsAtom = atomWithReducer<
  Map<number, number>,
  { type: "CHANGE_ITEM"; payload: { divIndex: number; itemIndex: number } }
>(new Map(), (state, action) => {
  if (action?.type === "CHANGE_ITEM") {
    return new Map(state).set(action.payload.divIndex, action.payload.itemIndex);
  }
  return state;
});

export const registeredDivsAtom = atomWithReducer<
  Map<number, React.RefObject<HTMLDivElement | null>>,
  | {
      type: "REGISTER_DIV";
      payload: { index: number; ref: React.RefObject<HTMLDivElement | null> };
    }
  | { type: "UNREGISTER_DIV"; payload: number }
>(new Map(), (state, action) => {
  switch (action?.type) {
    case "REGISTER_DIV":
      return new Map(state).set(action.payload.index, action.payload.ref);
    case "UNREGISTER_DIV": {
      const newState = new Map(state);
      newState.delete(action.payload);
      return newState;
    }
  }
  return state;
});

export const registeredItemsAtom = atomWithReducer<
  Map<number, Map<number, React.RefObject<HTMLLIElement | null>>>,
  | {
      type: "REGISTER_ITEM";
      payload: { divIndex: number; itemIndex: number; ref: React.RefObject<HTMLLIElement | null> };
    }
  | { type: "UNREGISTER_ITEM"; payload: { divIndex: number; itemIndex: number } }
>(new Map(), (state, action) => {
  switch (action?.type) {
    case "REGISTER_ITEM": {
      const newState = new Map(state);
      const divItems = newState.get(action.payload.divIndex) || new Map();
      divItems.set(action.payload.itemIndex, action.payload.ref);
      newState.set(action.payload.divIndex, divItems);
      return newState;
    }
    case "UNREGISTER_ITEM": {
      const newState = new Map(state);
      const divItems = newState.get(action.payload.divIndex);
      if (divItems) {
        divItems.delete(action.payload.itemIndex);
        if (divItems.size === 0) {
          newState.delete(action.payload.divIndex);
        }
      }
      return newState;
    }
  }
  return state;
});

export const scrollableStateAtom = atomWithReducer<
  {
    scrollableDiv?: { current: HTMLElement };
    scrollableIndex?: number;
  },
  { type: "SET_SCROLLABLE_DIV"; payload: { index: number; element: HTMLElement | undefined } }
>({}, (state, action) => {
  if (action?.type === "SET_SCROLLABLE_DIV") {
    const { index, element } = action.payload;
    return {
      scrollableDiv: element ? { current: element } : undefined,
      scrollableIndex: element ? index : undefined
    };
  }
  return state;
});
