"use client";

import React from "react";

import { Provider } from "jotai";

import NavigationProvider from "./NavigationProvider";
import ScrollProvider from "./ScrollProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Provider>
			<NavigationProvider />
			<ScrollProvider />
			{children}
		</Provider>
	);
};

export default Providers;
