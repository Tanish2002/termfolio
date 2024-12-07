"use client";

import React, { useEffect, useState } from "react";

import { Provider } from "jotai";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSettings, getCurrentTheme } from "@/lib/userSettings/userSettings.client";

import NavigationProvider from "./NavigationProvider";
import ScrollProvider from "./ScrollProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [initialTheme, setInitialTheme] = useState<ThemeSettings | null>(null);
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		const currTheme = getCurrentTheme();
		setInitialTheme(currTheme);
		setTimeout(() => {
			setIsLoading(false); // After 1.5 seconds, set loading to false
		}, 1500);
	}, []);

	if (isLoading || !initialTheme) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-tokyo-night-background text-tokyo-night-red">
				<div className="h-96 w-4/5 max-w-2xl overflow-hidden rounded-lg border-2 border-tokyo-night-red bg-tokyo-night-background shadow-lg">
					<div className="flex h-8 items-center border-b border-tokyo-night-red bg-tokyo-night-comment px-4">
						<div className="flex space-x-2">
							<div className="h-3 w-3 rounded-full bg-tokyo-night-orange"></div>
							<div className="h-3 w-3 rounded-full bg-tokyo-night-yellow"></div>
							<div className="h-3 w-3 rounded-full bg-tokyo-night-red"></div>
						</div>
					</div>
					<div className="p-4 font-mono">
						<div className="typing-animation">
							<span className="text-tokyo-night-red">➜</span> Loading theme configuration
							<span className="animate-pulse">_</span>
						</div>
						<div className="mt-2 opacity-75">
							<span className="text-tokyo-night-red">•</span> Resolving system preferences
						</div>
						<div className="mt-2 opacity-50">
							<span className="text-tokyo-night-red">•</span> Applying theme settings
						</div>
						<style jsx>{`
							.typing-animation {
								animation: typing 1s steps(40, end);
								overflow: hidden;
								white-space: nowrap;
							}
							@keyframes typing {
								from {
									width: 0;
								}
								to {
									width: 100%;
								}
							}
						`}</style>
					</div>
				</div>
			</div>
		);
	}

	// Once the theme is set or after 1.5 seconds, render the main content
	return (
		<Provider>
			<NavigationProvider />
			<ScrollProvider />
			<ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
		</Provider>
	);
};

export default Providers;
