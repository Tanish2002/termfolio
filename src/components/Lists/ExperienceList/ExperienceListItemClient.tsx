"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { atom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import { useMobileNavbarOpen } from "@/components/MobileNavbar/MobileNavbarContext";
import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import { focusedDivAtom, focusedItemsAtom } from "@/store/focusAtoms";
import cn from "@/utils/cn";

import { ExperienceListItemClientProps } from "./types";

const ExperienceListItemClient: React.FC<ExperienceListItemClientProps> = ({
	divIndex,
	experienceItem,
	itemIndex
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

	const pathName = usePathname();
	const isSelected = pathName.includes(experienceItem.slug);

	return (
		<NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={experienceItem.slug}>
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
				<p>{experienceItem.jobTitle}</p>
				<p
					className={
						isFocused || isSelected ? "text-tokyo-night-orange" : "text-tokyo-night-comment"
					}
				>
					@ {experienceItem.companyName}
				</p>
			</li>
		</NavigableItem>
	);
};

export default React.memo(ExperienceListItemClient);
