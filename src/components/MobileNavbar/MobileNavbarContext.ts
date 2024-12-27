import React from "react";
import { createContext, useContext } from "react";

export const MobileNavbarOpenContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export const useMobileNavbarOpen = () => {
  const context = useContext(MobileNavbarOpenContext);
  if (context === null) {
    return null; // don't return error since desktop components might not be wrapped in this mobile context
    throw new Error(
      "useMobileNavbarOpen must be used within a MobileNavbarOpenContext",
    );
  }
  return context;
};
