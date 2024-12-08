"use client";

// SocialListItemClient.tsx
import React, { useMemo } from "react";

import { atom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import { focusedDivAtom, focusedItemsAtom } from "@/store/focusAtoms";

// or the correct import based on your atom library
import { SocialListItemClientProps } from "./types";

const SocialListItemClient: React.FC<SocialListItemClientProps> = ({
	divIndex,
	socialItem,
	itemIndex,
	icon
}) => {
	const isFocused = useAtomValue(
		useMemo(
			() =>
				selectAtom(
					atom((get) => ({
						focusedDiv: get(focusedDivAtom),
						focusedItems: get(focusedItemsAtom)
					})),
					({ focusedDiv, focusedItems }) =>
						focusedDiv === divIndex && focusedItems.get(divIndex) === itemIndex
				),
			[divIndex, itemIndex]
		)
	);

	return (
		<NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={socialItem.href}>
			<li
				className={`flex w-full justify-between p-0.5 transition-colors ${
					isFocused ? "bg-tokyo-night-dark-blue" : "hover:bg-tokyo-night-selection/20"
				}`}
			>
				<p>{socialItem.socialName}</p>
				<div className={isFocused ? "text-tokyo-night-orange" : ""}>{icon}</div>
			</li>
		</NavigableItem>
	);
};

export default React.memo(SocialListItemClient);
