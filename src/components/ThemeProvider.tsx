'use client'
import { ResolvedThemeType, ThemeSettings, ThemeType } from "@/lib/userSettings/userSettings.client";
import { updateUserTheme } from "@/lib/userSettings/userSettings.server";
import { createContext, useEffect, useState } from "react";

// Create Theme Context
export const ThemeContext = createContext<{
	theme: ThemeType;
	actualTheme: ResolvedThemeType;
	setTheme: (theme: ThemeType) => void;
}>({
	theme: 'dark',
	actualTheme: 'dark',
	setTheme: () => { }
});

// Theme Provider Component
export function ThemeProvider({
	children,
	initialTheme
}: {
	children: React.ReactNode,
	initialTheme: ThemeSettings | null
}) {
	if (!initialTheme || !initialTheme.resolvedTheme || !initialTheme.theme) return;
	const [theme, setThemeState] = useState<ThemeType>(initialTheme.theme);
	const [actualTheme, setActualTheme] = useState<ResolvedThemeType>(initialTheme.resolvedTheme);

	const setTheme = async (newTheme: ThemeType) => {
		const resolvedTheme = resolveTheme(newTheme);

		// Update cookie
		await updateUserTheme({ theme: newTheme, resolvedTheme: resolvedTheme });

		// Update state
		setThemeState(newTheme);

		// apply theme
		setActualTheme(resolvedTheme);
		applyTheme(resolvedTheme);
	};

	// Resolve theme based on user preference and system setting
	const resolveTheme = (themePreference: ThemeType | null): ResolvedThemeType => {
		if (themePreference === 'system') {
			// Check media query if available
			if (typeof window !== 'undefined') {
				return window.matchMedia("(prefers-color-scheme: dark)").matches
					? 'dark'
					: 'light';
			}
			return 'dark'; // Default to dark if no media query
		}
		return themePreference ?? "dark"; // default dark mode
	};

	// Apply theme to document body
	const applyTheme = (resolvedTheme: ResolvedThemeType) => {
		if (typeof document !== 'undefined') {
			const htmlElement = document.documentElement;

			if (resolvedTheme === 'dark') {
				htmlElement.classList.add('dark');
				htmlElement.setAttribute('data-theme', 'dark');
			} else {
				htmlElement.classList.remove('dark');
				htmlElement.setAttribute('data-theme', 'light');
			}
		}
	};


	// Effect to keep track of theme changes
	useEffect(() => {
		// Resolve and apply initial theme
		const resolvedTheme = resolveTheme(theme);

		setActualTheme(resolvedTheme);
		applyTheme(resolvedTheme);

		// Setup media query listener for system theme
		if (theme === 'system' && typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

			const handleMediaQueryChange = () => {
				const newTheme = mediaQuery.matches ? 'dark' : 'light';
				setActualTheme(newTheme);
				applyTheme(newTheme);
			};

			mediaQuery.addEventListener('change', handleMediaQueryChange);

			// Cleanup
			return () => {
				mediaQuery.removeEventListener('change', handleMediaQueryChange);
			};
		}
	}, [theme, initialTheme.theme]);

	// if (isInitialLoad) {
	// 	return (
	// 		<div className="fixed inset-0 z-50 flex items-center justify-center bg-tokyo-night-background text-tokyo-night-red">
	// 			<div className="w-4/5 max-w-2xl h-96 bg-tokyo-night-background border-2 border-tokyo-night-red rounded-lg shadow-lg overflow-hidden">
	// 				<div className="bg-tokyo-night-comment h-8 flex items-center px-4 border-b border-tokyo-night-red">
	// 					<div className="flex space-x-2">
	// 						<div className="w-3 h-3 bg-tokyo-night-orange rounded-full"></div>
	// 						<div className="w-3 h-3 bg-tokyo-night-yellow rounded-full"></div>
	// 						<div className="w-3 h-3 bg-tokyo-night-red rounded-full"></div>
	// 					</div>
	// 				</div>
	// 				<div className="p-4 font-mono">
	// 					<div className="typing-animation">
	// 						<span className="text-tokyo-night-red">➜</span> Loading theme configuration
	// 						<span className="animate-pulse">_</span>
	// 					</div>
	// 					<div className="mt-2 opacity-75">
	// 						<span className="text-tokyo-night-red">•</span> Resolving system preferences
	// 					</div>
	// 					<div className="mt-2 opacity-50">
	// 						<span className="text-tokyo-night-red">•</span> Applying theme settings
	// 					</div>
	// 					<style jsx>{`
	//            .typing-animation {
	//              animation: typing 1s steps(40, end);
	//              overflow: hidden;
	//              white-space: nowrap;
	//            }
	//            @keyframes typing {
	//              from { width: 0 }
	//              to { width: 100% }
	//            }
	//          `}</style>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
