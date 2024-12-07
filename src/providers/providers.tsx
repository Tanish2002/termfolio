"use client";

import React, { useEffect, useState } from "react";

import { Provider } from "jotai";

import { ThemeProvider } from "@/components/ThemeProvider";

import NavigationProvider from "./NavigationProvider";
import ScrollProvider from "./ScrollProvider";
import { getCurrentTheme, ThemeSettings } from "@/lib/userSettings/userSettings.client";

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
				<div className="w-4/5 max-w-2xl h-96 bg-tokyo-night-background border-2 border-tokyo-night-red rounded-lg shadow-lg overflow-hidden">
					<div className="bg-tokyo-night-comment h-8 flex items-center px-4 border-b border-tokyo-night-red">
						<div className="flex space-x-2">
							<div className="w-3 h-3 bg-tokyo-night-orange rounded-full"></div>
							<div className="w-3 h-3 bg-tokyo-night-yellow rounded-full"></div>
							<div className="w-3 h-3 bg-tokyo-night-red rounded-full"></div>
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
								from { width: 0; }
								to { width: 100%; }
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
			<ThemeProvider initialTheme={initialTheme}>
				{children}
			</ThemeProvider>
		</Provider>
	);
};

export default Providers;
