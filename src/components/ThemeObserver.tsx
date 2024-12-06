'use client';

import { updateUserTheme } from '@/lib/userSettings/userSettings.server';
import { useEffect } from 'react';

export function ThemeObserver() {
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = (e: MediaQueryListEvent) => {
			const newTheme = e.matches ? 'dark' : 'light';
			updateUserTheme({ theme: 'system' });

			// Update theme classes
			document.documentElement.classList.toggle('dark', e.matches);
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, []);

	return null;
}
