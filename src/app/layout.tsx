import type { Metadata } from "next";
import Script from "next/script";
import React from "react";

import About from "@/components/About";
import BorderBox from "@/components/BorderBox/BorderBox";
import RoutesList from "@/components/Lists/RoutesList/RoutesList";
import SocialList from "@/components/Lists/SocialList/SocialList";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import NavigableDiv from "@/components/NavigableComponents/NavigableDiv/NavigableDiv";
import ScrollableDiv from "@/components/NavigableComponents/ScrollableDiv/ScrollableDiv";
import { mono, scientifica } from "@/constants";
import { getCurrentFont } from "@/lib/userSettings/server";
import Providers from "@/providers/providers";
import cn from "@/utils/cn";

import "./globals.css";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app"
};

export default async function RootLayout({
	children,
	list
}: Readonly<{
	children: React.ReactNode;
	list: React.ReactNode;
}>) {
	const { font } = await getCurrentFont();

	return (
		<html
			lang="en"
			suppressHydrationWarning // disable hydration warning coz we using custom script to update this
		>
			<body
				className={cn(
					"flex h-svh w-screen flex-col bg-tokyo-night-background text-tokyo-night-foreground antialiased transition-colors",
					scientifica.variable,
					mono.variable,
					font === "mono" ? "font-mono" : "font-scientifica"
				)}
			>
				<Providers>
					<div
						className={cn(
							"grid h-full w-screen flex-grow-[99] grid-rows-7 gap-4 overflow-hidden p-5",
							"lg:grid-cols-4",
							"md:grid-cols-6",
							"grid-cols-1"
						)}
					>
						<NavigableDiv
							index={0}
							className={cn(
								"col-start-1 row-span-1 row-start-1 hidden md:flex", //common
								"lg:col-span-1", //lg
								"md:col-span-2" //md
							)}
						>
							<BorderBox
								texts={[
									{
										textYPosition: "top",
										textXPosition: "left",
										text: "bakaotaku.dev"
									}
								]}
							>
								<About />
							</BorderBox>
						</NavigableDiv>
						<NavigableDiv
							index={1}
							className={cn(
								"col-start-1 row-span-2 hidden md:flex", //common
								"lg:col-span-1", //lg
								"md:col-span-2" //md
							)}
						>
							<BorderBox
								texts={[
									{
										textYPosition: "top",
										textXPosition: "left",
										text: "pages"
									}
								]}
							>
								<RoutesList divIndex={1} />
							</BorderBox>
						</NavigableDiv>
						<NavigableDiv
							index={2}
							className={cn(
								"col-start-1 row-span-2 hidden md:flex", //common
								"lg:col-span-1", //lg
								"md:col-span-2" //md
							)}
						>
							{/* Render a parallel route based on the current pathName */}
							{list}
						</NavigableDiv>
						<NavigableDiv
							index={3}
							className={cn(
								"col-start-1 row-span-2 hidden md:flex", //common
								"lg:col-span-1", //lg
								"md:col-span-2" //md
							)}
						>
							<BorderBox
								texts={[
									{
										textYPosition: "top",
										textXPosition: "left",
										text: "socials"
									}
								]}
							>
								<SocialList divIndex={3} />
							</BorderBox>
						</NavigableDiv>
						<div
							className={cn(
								"col-span-1 col-start-1 row-span-7 row-start-1", //common
								"lg:col-span-3", //lg
								"md:col-span-4" //md
							)}
						>
							<ScrollableDiv index={4} className="h-full">
								<BorderBox
									texts={[
										{
											textYPosition: "top",
											textXPosition: "left",
											text: "main"
										}
									]}
								>
									{children}
								</BorderBox>
							</ScrollableDiv>
						</div>
					</div>

					<MobileNavbar list={list} />
				</Providers>
				<footer className={cn("hidden", "mx-6 md:flex md:flex-grow-[1]")}>
					<div className="flex divide-x divide-tokyo-night-foreground">
						<div className="px-2">
							<span className="text-tokyo-night-red">&lt;pgUp&gt;/&lt;pgDown&gt;:</span>
							<span className="text-tokyo-night-blue">scroll</span>
						</div>
						<div className="px-2">
							<span className="text-tokyo-night-red">&lt;left&gt;/&lt;right&gt;:</span>
							<span className="text-tokyo-night-blue">switch section</span>
						</div>
						<div className="px-2">
							<span className="text-tokyo-night-red">&lt;up&gt;/&lt;down&gt;:</span>
							<span className="text-tokyo-night-blue">switch item/scroll</span>
						</div>
						<div className="px-2">
							<span className="text-tokyo-night-red">&lt;Enter&gt;:</span>
							<span className="text-tokyo-night-blue">select item</span>
						</div>
					</div>
					<div className="px-2">
						<span className="text-tokyo-night-magenta">(or just use the mouse 😆)</span>
					</div>
				</footer>
				<Script id="theme-setter" strategy="beforeInteractive">
					{`
(() => {
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const setCookie = (name, value, options = {}) => {
    let cookieString = name + '=' + value + ';path=' + (options.path || '/') + ';';
    if (options.maxAge) {
      cookieString += 'max-age=' + options.maxAge + ';';
    }
    document.cookie = cookieString;
  };

  const prefersDarkMQ = "(prefers-color-scheme: dark)";
  const cookieTheme = getCookie("user-theme");
	const theme = cookieTheme ?? "system";

  const cookieResolvedTheme = getCookie("user-resolved-theme");
	const resolvedTheme = theme === "dark" || theme === "light" 
  	? theme 
  	: window.matchMedia(prefersDarkMQ).matches 
  	? "dark" 
  	: "light";

  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains("dark");

  if (themeAlreadyApplied) {
    console.warn(
      "Hi there, could you let Tanish know you're seeing this message? Thanks!"
    );
  } else {
    if (resolvedTheme === "dark") {
      cl.add("dark");
    } else {
      cl.remove("dark");
    }
    setCookie("user-theme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    setCookie("user-resolved-theme", resolvedTheme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
  }
})();
`}
				</Script>
			</body>
		</html>
	);
}
