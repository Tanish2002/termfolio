"use client";

import React from "react";

import { Provider } from "jotai";

import { ThemeObserver } from "@/components/ThemeObserver";

import NavigationProvider from "./NavigationProvider";
import ScrollProvider from "./ScrollProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Provider>
			<NavigationProvider />
			<ScrollProvider />
			<ThemeObserver />
			{children}
		</Provider>
	);
};

export default Providers;
