import type { Metadata } from "next";
import Script from "next/script";
import React from "react";

import About from "@/components/About";
import BorderBox from "@/components/BorderBox/BorderBox";
import { FirstVisitToast } from "@/components/FirstTimeVisitToast";
import RoutesList from "@/components/Lists/RoutesList/RoutesList";
import SocialList from "@/components/Lists/SocialList/SocialList";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import NavigableDiv from "@/components/NavigableComponents/NavigableDiv/NavigableDiv";
import CustomToaster from "@/components/Toaster";
import { mono, scientifica } from "@/constants";
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
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true} // disable hydration warning coz we using custom script to update this
        className={cn(
          "flex h-svh w-screen flex-col bg-tokyo-night-background text-tokyo-night-foreground antialiased transition-colors",
          mono.variable, scientifica.variable
        )}
      >
        {/* import here so font is used */}
        <CustomToaster />
        <Providers>
          <LivePreviewListener />
          <FirstVisitToast />
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
              label="About Section"
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
              label="Routes List"
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
              label="Dynamic List based upon route"
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
              label="Socials List"
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
              <NavigableDiv label="Main Content" index={4} className="h-full" isScrollable={true}>
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
              </NavigableDiv>
            </div>
          </div>

          <MobileNavbar list={list} />
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

        </Providers>
        <Script id="theme-setter" strategy="beforeInteractive">
          {`
(() => {
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const prefersDarkMQ = "(prefers-color-scheme: dark)";
  const cookieTheme = getCookie("user-theme");
  const theme = cookieTheme ?? "system";

  const resolveTheme = (themePreference) => {
    if (themePreference === "system") {
      return window.matchMedia(prefersDarkMQ).matches ? "dark" : "light";
    }
    return themePreference ?? "dark"; // default dark mode
  };

  const applyTheme = (resolvedTheme) => {
    const htmlElement = document.body;

    if (resolvedTheme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.setAttribute("data-theme", "light");
    }
  };

  const resolvedTheme = resolveTheme(theme);
  applyTheme(resolvedTheme);

  // Store the resolved theme in a global variable for the provider to sync with
  window.__initialTheme = { theme, resolvedTheme };
})();
`}
        </Script>
        <Script id="font-setter" strategy="beforeInteractive">
          {`
(() => {
  try {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user-font='))
      ?.split('=')[1];
    const fontClass = cookie === 'mono' ? 'font-mono' : 'font-scientifica';
    const fontClassToRemove = cookie === 'mono' ? 'font-scientifica' : 'font-mono';
    document.body.classList.remove(fontClassToRemove);
    document.body.classList.add(fontClass);

    // Store the resolved font in a global variable for the provider to sync with
    window.__initialFont = cookie  === 'mono' ? 'mono' : 'scientifica';
  } catch (e) {
    console.error("Hey this shouldn't happen.. Can you let tanish know about this thanks!");
  }
})();
`}
        </Script>
      </body>
    </html>
  );
}
