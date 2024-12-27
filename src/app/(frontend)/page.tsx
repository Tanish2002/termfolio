import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import BorderBox from "@/components/BorderBox/BorderBox";
import WalkingGif from "@/components/WalkingGif";
import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

import FortuneCookie from "./page.client";

async function getFortune(): Promise<string> {
  try {
    const response = await fetch("https://aphorismcookie.herokuapp.com", {
      cache: "no-store"
    });
    const data: { data: { message: string }; meta: { status: number } } = await response.json();
    return data.data.message;
  } catch (error) {
    console.error("Error fetching fortune:", error);
    return "No fortune available at the moment!";
  }
}

export const dynamic = "force-static";

export default React.memo(async function About() {
  const fortune = await getFortune();
  return (
    <>
      <WalkingGif />
      <div className="prose-xl my-auto space-y-4 prose-p:my-0">
        <p>
          Hey there! I&apos;m <span className="text-tokyo-night-cyan">Tanish</span> Khare 👋
        </p>
        <div>
          <p>
            I&apos;m a <span className="text-tokyo-night-orange">full-stack</span> developer with a
            strong focus on backend development.
          </p>
          <p>
            That said, I love exploring other functional languages like{" "}
            <span className="text-tokyo-night-magenta">Rust</span> and{" "}
            <span className="text-tokyo-night-magenta">Haskell</span> too! 🧠
          </p>
        </div>
        <div>
          <p>
            Another big passion of mine is <span className="text-tokyo-night-orange">DevOps</span>{" "}
            and <span className="text-tokyo-night-orange">IT</span> in general. I’ve got a home lab
            where I <span className="text-tokyo-night-cyan">self-host</span> a few services for
            multimedia 🎥 and use it as a personal NAS for family storage. I enjoy tinkering with
            hardware and upgrading parts 🔧. One of my future goals is to build out a cluster of
            self-hosted servers! 🖥️
          </p>
          <p>
            I’m always{" "}
            <span className="text-tokyo-night-cyan">eager to take on new challenges</span> and learn
            new things.
          </p>
        </div>
        <div>
          <p>
            These days, you’ll find me on{" "}
            <Link href="https://x.com/baka_otaku2002" className="text-tokyo-night-red underline">
              X (Twitter)
            </Link>{" "}
            🐦.
          </p>
          <p>
            If you want to cringe a little, feel free to connect with me on{" "}
            <Link
              href="https://www.linkedin.com/in/tanish-khare-144032169/"
              className="text-tokyo-night-red underline"
            >
              LinkedIn
            </Link>
            ! 💼
          </p>
          <p>
            Check out my projects and code over on{" "}
            <Link href="https://github.com/Tanish2002/" className="text-tokyo-night-red underline">
              GitHub
            </Link>{" "}
            💻.
          </p>
          <p>
            Oh, and you can find my résumé here 👉{" "}
            <Link
              href="https://drive.google.com/file/d/1B_H_v4Vl93RSfaaP6o-I9O9kFUQoHu8m/view?usp=sharing"
              className="text-tokyo-night-red underline"
            >
              resume
            </Link>
          </p>
        </div>
        <div>
          <p>
            <span className="text-tokyo-night-cyan">Click</span> on the pages section on the left,
            or on the floating hamburger icon (if you&apos;re on mobile), to learn more about my
            work and past experiences.
          </p>
          <p>
            Or if you&apos;re feeling fancy, navigate with the{" "}
            <span className="text-tokyo-night-cyan">arrow keys</span> or{" "}
            <span className="text-tokyo-night-cyan">Vim motions!</span> 😎
          </p>
        </div>
      </div>

      <div className="prose-xl mx-auto my-2">
        <BorderBox texts={[{ textXPosition: "left", textYPosition: "top", text: "🥠" }]}>
          <div>
            <FortuneCookie />
          </div>
        </BorderBox>
      </div>
    </>
  );
});

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
