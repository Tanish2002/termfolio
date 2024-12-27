"use client";

import { useEffect, useState } from "react";

async function getFortune(): Promise<string> {
  try {
    const response = await fetch("https://aphorismcookie.herokuapp.com", {
      cache: "no-store",
    });
    const data: { data: { message: string }; meta: { status: number } } =
      await response.json();
    return data.data.message;
  } catch (error) {
    console.error("Error fetching fortune:", error);
    return "No fortune available at the moment!";
  }
}

export default function FortuneCookie() {
  const [fortune, setFortune] = useState<string>("Loading your fortune...");
  useEffect(() => {
    getFortune().then(setFortune);
  }, []);

  return fortune;
}
