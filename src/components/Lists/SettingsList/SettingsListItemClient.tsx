"use client";

import React, { useMemo } from "react";

import { atom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import { useMobileNavbarOpen } from "@/components/MobileNavbar/MobileNavbarContext";
import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import { focusedDivAtom, focusedItemsAtom } from "@/store/focusAtoms";
import cn from "@/utils/cn";

import { SettingsListItemClientProps } from "./types";

const SettingsListItemClient: React.FC<SettingsListItemClientProps> = ({
	divIndex,
	settingsItem,
	itemIndex,
	pageKey
}) => {
	const setIsOpen = useMobileNavbarOpen();

	const isFocused = useAtomValue(
		useMemo(
			() =>
				selectAtom(
					atom((get) => ({
						focusedDiv: get(focusedDivAtom),
						focusedItems: get(focusedItemsAtom)
					})),
					({ focusedDiv, focusedItems }) =>
						focusedDiv === divIndex && focusedItems[divIndex] === itemIndex
				),
			[divIndex, itemIndex]
		)
	);

	const isSelected = settingsItem.settingsKey === pageKey;

	return (
		<NavigableItem
			divIndex={divIndex}
			itemIndex={itemIndex}
			href={"/settings/" + settingsItem.settingsKey}
		>
			<li
				className={cn(
					"flex w-full justify-between p-0.5 transition-colors",
					isFocused ? "bg-tokyo-night-dark-blue" : "hover:bg-tokyo-night-selection/20"
				)}
				onClick={() => {
					if (setIsOpen) {
						setIsOpen((prev) => !prev);
					}
				}}
			>
				<p>{settingsItem.name}</p>
				<p
					className={
						isFocused || isSelected ? "text-tokyo-night-orange" : "text-tokyo-night-comment"
					}
				>
					{settingsItem.settingsValue}
				</p>
			</li>
		</NavigableItem>
	);
};

export default React.memo(SettingsListItemClient);
