import type { Metadata } from "next";
import Script from "next/script";
import React from "react";

import { Toaster } from "sonner";

import About from "@/components/About";
import BorderBox from "@/components/BorderBox/BorderBox";
import RoutesList from "@/components/Lists/RoutesList/RoutesList";
import SocialList from "@/components/Lists/SocialList/SocialList";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import NavigableDiv from "@/components/NavigableComponents/NavigableDiv/NavigableDiv";
import ScrollableDiv from "@/components/NavigableComponents/ScrollableDiv/ScrollableDiv";
import { mono, scientifica } from "@/constants";
import { getCurrentFont } from "@/lib/userSettings/server";
import Providers from "@/providers/providers";
import cn from "@/utils/cn";
import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

import "./globals.css";

export function generateMetadata(): Metadata {
  const title = "Termfolio | bakaotaku.dev";
  const description =
    "Welcome to my personal space! Learn more about me, explore the technologies I'm skilled in, and discover the tools I use to build impactful projects.";
  return {
    title,
    description,
    ...mergeSocialMetadata({
      title,
      description,
      image: `${getServerSideURL()}/og/About.png`,
      url: "/"
    })
  };
}

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
          font === "mono"
            ? `font-mono ${mono.variable}`
            : `font-scientifica ${scientifica.variable}`
        )}
      >
        {/* import here so font is used */}
        <Toaster
          toastOptions={{
            classNames: {
              success: "bg-tokyo-night-green",
              info: "bg-tokyo-night-blue",
              error: "bg-tokyo-night-red",
              warning: "bg-tokyo-night-yellow"
            }
          }}
        />
        <Providers>
          <LivePreviewListener />
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
              <RoutesList divIndex={1} />
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
              <SocialList divIndex={3} />
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
