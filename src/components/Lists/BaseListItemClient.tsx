"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { atom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import { useMobileNavbarOpen } from "@/components/MobileNavbar/MobileNavbarContext";
import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import useIsMobile from "@/hooks/useIsMobile";
import { focusedDivAtom, focusedItemsAtom } from "@/store/focusAtoms";
import cn from "@/utils/cn";

import { BaseListItem, BaseListItemClientProps } from "./types";

export function BaseListItemClient<T extends BaseListItem>({
	divIndex,
	item,
	itemIndex
}: BaseListItemClientProps<T>) {
	const setIsOpen = useMobileNavbarOpen();
	const pathName = usePathname();
	const isMobile = useIsMobile();

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

	const isSelected = item.href
		? item.href === "/" && pathName !== "/" /* check for the / route */
			? false
			: pathName.includes(item.href)
		: false;

	const content = (
		<li
			className={cn(
				"flex w-full items-center justify-between p-0.5 transition-colors",
				isFocused
					? "bg-tokyo-night-dark-blue/80 text-tokyo-night-code-background"
					: "hover:bg-tokyo-night-selection/20"
			)}
			onClick={() => {
				if (isMobile && setIsOpen) {
					setIsOpen((prev) => !prev);
				}
			}}
		>
			<p className="m-0.5">{item.leftContent}</p>
			{item.rightContent && (
				<div
					className={cn(
						isFocused || isSelected ? "text-tokyo-night-orange" : "text-tokyo-night-comment",
						"m-0.5"
					)}
				>
					{item.rightContent}
				</div>
			)}
		</li>
	);

	if (item.href) {
		return (
			<NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={item.href}>
				{content}
			</NavigableItem>
		);
	}

	return (
		<NavigableItem divIndex={divIndex} itemIndex={itemIndex}>
			{content}
		</NavigableItem>
	);
}
