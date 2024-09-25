"use client";

import React, { useCallback, useState } from "react";

import { CiMenuBurger } from "react-icons/ci";
import { GiSkullCrossedBones } from "react-icons/gi";

import { MobileNavbarOpenContext } from "./MobileNavbarContext";

const MobileNavbarClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, [setIsOpen]);

	return (
		<>
			<div className="fixed bottom-10 right-10 z-10 md:hidden">
				<span
					onClick={handleClick}
					className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-tokyo-night-red text-tokyo-night-background"
				>
					{isOpen ? (
						<GiSkullCrossedBones className="w-6 stroke-2" />
					) : (
						<CiMenuBurger className="w-6 stroke-2" />
					)}
				</span>
			</div>

			<div
				className={`z-9 fixed inset-0 transform bg-tokyo-night-background transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				{isOpen && (
					<MobileNavbarOpenContext.Provider value={setIsOpen}>
						{children}
					</MobileNavbarOpenContext.Provider>
				)}
			</div>
		</>
	);
};

export default MobileNavbarClient;
