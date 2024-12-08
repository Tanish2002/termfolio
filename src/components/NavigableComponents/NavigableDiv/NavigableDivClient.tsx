"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";

import { focusedDivAtom, focusedItemsAtom, registeredDivsAtom } from "@/store/focusAtoms";

import { NavigableFocusContext } from "../NavigableFocusContext";

const NavigableDivClient: React.FC<{
	index: number;
	children: React.ReactNode;
	className: string;
}> = ({ index, children, className }) => {
	const setFocusedDiv = useSetAtom(focusedDivAtom);
	const setFocusedItems = useSetAtom(focusedItemsAtom);
	const registerDiv = useSetAtom(registeredDivsAtom);

	const isFocused = useAtomValue(
		useMemo(() => selectAtom(focusedDivAtom, (focused) => focused === index), [index])
	);

	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		registerDiv((prev) => new Map(prev).set(index, divRef));

		return () => {
			registerDiv((prev) => {
				const updatedDivs = new Map(prev);
				updatedDivs.delete(index);
				return updatedDivs;
			});
		};
	}, [index, registerDiv]);

	const handleClick = useCallback(() => {
		setFocusedDiv(index);
		setFocusedItems((prev) => new Map(prev).set(index, prev.get(index) || 0)); // Restore or set initial item index to 0
		divRef.current?.focus();
	}, [setFocusedDiv, setFocusedItems, divRef, index]);

	return (
		<NavigableFocusContext.Provider value={isFocused}>
			<div ref={divRef} onClick={handleClick} onTouchStart={handleClick} className={className}>
				{children}
			</div>
		</NavigableFocusContext.Provider>
	);
};

export default React.memo(NavigableDivClient);
