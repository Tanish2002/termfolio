import { Metadata } from "next";

import { getServerSideURL } from "@/utils/getURL";
import { mergeSocialMetadata } from "@/utils/mergeOpenGraph";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
	const title = "Experience | bakaotaku.dev";
	const description =
		"Learn about my professional journey, including internships, skills, and open-source contributions in full-stack development and DevOps.";
	return {
		title,
		description,
		...mergeSocialMetadata({
			title,
			description,
			image: `${getServerSideURL()}/og/Experience.png`,
			url: "/experience"
		})
	};
}

export default async function Experience() {
	return (
		<div className="prose-xl my-auto space-y-4 prose-p:my-0">
			<p>
				Welcome to my experience page! Here, you can dive into my professional journey and see the
				awesome places I&apos;ve worked and the skills I&apos;ve honed along. 🚀
			</p>
			<div>
				<p>
					Throughout my career, I&apos;ve had the privilege of working with amazing teams and
					tackling exciting challenges. From
					<span className="text-tokyo-night-orange"> backend development</span> to
					<span className="text-tokyo-night-orange"> full-stack projects</span>, each experience has
					taught me something new and helped me grow as a developer.
				</p>
				<p>
					I&apos;ve completed <span className="text-tokyo-night-cyan">two internships</span> where I
					focused on real-world applications and gained valuable skills. Additionally, I’ve made
					numerous <span className="text-tokyo-night-magenta">open-source contributions</span> that
					I’m really proud of! 🎉
				</p>
			</div>

			<div>
				<p>
					Each position has enriched my toolkit, and I&apos;m excited to share my growing skill set,
					including:
				</p>
				<ul className="list-disc">
					<li>
						<span className="text-tokyo-night-cyan">Backend Development</span> with Node.js,
						Express, Golang, etc.
					</li>
					<li>
						<span className="text-tokyo-night-cyan">Full-Stack Development</span> using the MERN
						stack
					</li>
					<li>
						<span className="text-tokyo-night-cyan">DevOps practices</span> and home lab management
					</li>
					<li>And much more! 🎉</li>
				</ul>
			</div>

			<div>
				<p>
					I’m currently <span className="text-tokyo-night-orange">available for work</span> and
					would love to connect! If you&apos;d like to learn more about my experiences or discuss
					opportunities, feel free to reach out through the socials section on left! 💬
				</p>
			</div>

			<div>
				<p>
					Ready to explore my individual experiences?{" "}
					<span className="text-tokyo-night-cyan">Click</span> on the experience section to dive
					deeper into each role! 🕵️‍♂️
				</p>
			</div>
		</div>
	);
}
