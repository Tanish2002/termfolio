"use client";

import { useEffect, useState } from "react";

export default function useIsMobile() {
	const [width, setWidth] = useState<number>(typeof window === "undefined" ? 0 : window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 768;
	return isMobile;
}
