import { atom } from "jotai";

export type FontOption = "scientifica" | "mono";

export const fontAtom = atom<FontOption>("scientifica");
