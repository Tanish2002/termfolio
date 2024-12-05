"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { atom, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import { useMobileNavbarOpen } from "@/components/MobileNavbar/MobileNavbarContext";
import NavigableItem from "@/components/NavigableComponents/NavigableItem/NavigableItem";
import { focusedDivAtom, focusedItemsAtom } from "@/store/focusAtoms";
import cn from "@/utils/cn";

import { BlogListItemClientProps } from "./types";

const BlogListItemClient: React.FC<BlogListItemClientProps> = ({
	divIndex,
	blogItem,
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
	const isSelected = pathName.includes(blogItem.slug);

	return (
		<NavigableItem divIndex={divIndex} itemIndex={itemIndex} href={blogItem.slug}>
			<li
				className={cn(
					"flex w-full items-center justify-between p-0.5 transition-colors",
					isFocused ? "bg-tokyo-night-dark-blue" : "hover:bg-tokyo-night-selection/20"
				)}
				onClick={() => {
					if (setIsOpen) {
						setIsOpen((prev) => !prev);
					}
				}}
			>
				<p className="m-0.5">{blogItem.title}</p>
				<p
					className={cn(
						isFocused || isSelected ? "text-tokyo-night-orange" : "text-tokyo-night-comment",
						"m-0.5"
					)}
				>
					{blogItem.readTime}
				</p>
			</li>
		</NavigableItem>
	);
};

export default React.memo(BlogListItemClient);
