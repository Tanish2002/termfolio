import Link from "next/link";

type Args = {
	searchParams: Promise<{
		status: "published" | "archived";
	}>;
};

export const dynamic = "force-static";

export default async function Blog({ searchParams }: Args) {
	const status = ["published", "archived"].includes((await searchParams).status)
		? (await searchParams).status
		: "published";
	return (
		<div className="prose-xl my-auto space-y-4 prose-p:my-0">
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
					to connect! I’d love to hear how my posts resonate with you. 💬
				</p>
			</div>

			<div>
				<p>
					Want to see some {status === "archived" ? "latest" : "old archived"} blog posts?{" "}
					<span className="text-tokyo-night-cyan">
						<Link href={`/blog?status=${status === "archived" ? "published" : "archived"}`}>
							Click Here
						</Link>
					</span>{" "}
					then check the blog list to explore all my
					{status === "archived" ? " writings 📝" : " old writings 🧓"}
				</p>
			</div>
		</div>
	);
}
