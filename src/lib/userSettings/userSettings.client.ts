// Client-side theme detection function
export function getSystemTheme(): "dark" | "light" {
	if (typeof window !== 'undefined') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
	}
	return "light"; // Default to light if not in browser environment
}
