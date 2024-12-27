"use client";

import { useEffect, useState } from "react";

import { Provider } from "jotai";

import { getCurrentTheme } from "@/lib/userSettings/client";
import { ThemeSettings } from "@/lib/userSettings/theme/types";
import NavigationProvider from "@/providers/NavigationProvider";
import ScrollProvider from "@/providers/ScrollProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialTheme, setInitialTheme] = useState<ThemeSettings | null>(null);

  useEffect(() => {
    const currTheme = getCurrentTheme();
    setInitialTheme(currTheme);
  }, []);

  return (
    <Provider>
      <NavigationProvider />
      <ScrollProvider />
      <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
