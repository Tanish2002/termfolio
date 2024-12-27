import { getCookie, setCookie } from "cookies-next/client";

import { FontSettings } from "./types";

// get current user font from cookies on client
export function getCurrentFont(): FontSettings {
  const fontCookie = getCookie("user-font");

  // Default is scientifica
  return {
    font: fontCookie === "mono" ? "mono" : "scientifica"
  };
}

// function to set user selected font in cookie on client
export function updateUserFont(settings: FontSettings) {
  setCookie("user-font", settings.font);
  if (settings.font === "scientifica") {
    document.body.classList.remove("font-mono");
    document.body.classList.add("font-scientifica");
    return;
  }
  document.body.classList.remove("font-scientifica");
  document.body.classList.add("font-mono");
}
