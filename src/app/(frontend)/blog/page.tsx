import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

import BlogHeader from "./page.client";

export const dynamic = "force-static";

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const isArchived = (await searchParams).status === "archived";
  const title = isArchived ? "Archived Blog Posts" : "Blog" + " | bakaotaku.dev";
  const description = isArchived
    ? "Browse through my archived blog posts about tech, automation, and programming."
    : "Read my latest thoughts and discoveries about tech, home servers, automation, and programming languages.";

  return {
    title,
    description,
    ...mergeSocialMetadata({
      title,
      description,
      image: `${getServerSideURL()}/og/Blog.png`,
      url: "/blog"
    })
  };
}

export default function Blog() {
  return (
    <div className="prose-xl my-auto space-y-4">
      <BlogHeader />

      <p>
        Welcome to my blog! Here, I share thoughts, discoveries, and interesting tidbits from my
        tech adventures and beyond. 🌟
      </p>
      <div>
        <p>
          From experimenting with <span className="text-tokyo-night-orange">home servers</span> to
          diving into <span className="text-tokyo-night-orange">automation</span> and
          <span className="text-tokyo-night-orange"> programming languages</span>, this blog is my
          little corner to log everything that fascinates me. 💡
        </p>
        <p>
          I keep my blogs <span className="text-tokyo-night-cyan">short and concise</span>, mostly
          as a personal reference. However, I hope that anyone who stumbles upon them can learn
          something new or find inspiration! 📚
        </p>
      </div>

      <div>
        <p>Some of the topics you might find here include:</p>
        <ul className="list-disc">
          <li>
            <span className="text-tokyo-night-cyan">Home Server Adventures</span>: Setting up and
            optimizing home labs
          </li>
          <li>
            <span className="text-tokyo-night-cyan">Automation</span>: Streamlining workflows and
            reducing manual effort
          </li>
          <li>
            <span className="text-tokyo-night-cyan">Languages & Libraries</span>: Exploring new
            tools and concepts in tech
          </li>
          <li>
            <span className="text-tokyo-night-cyan">Linux & Open Source</span>: Tips, tricks, and
            hacks from the command line
          </li>
          <li>And everything else tech (and beyond)! 🚀</li>
        </ul>
      </div>

      <div>
        <p>
          If you enjoy learning about the same things or just want to share your thoughts, feel free
          to connect! I&apos;d love to hear how my posts resonate with you. 💬
        </p>
      </div>
    </div>
  );
}
