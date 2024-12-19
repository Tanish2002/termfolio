export const dynamic = "force-static";

export default async function Projects() {
	return (
		<div className="prose-xl my-auto space-y-4 prose-p:my-0">
			<p>
				Welcome to my projects showcase! Here, you&apos;ll find a collection of my technical
				adventures and creative solutions that I&apos;ve built over the years. 🛠️
			</p>
			<div>
				<p>
					From building <span className="text-tokyo-night-orange">automation tools</span> to
					crafting <span className="text-tokyo-night-orange">web applications</span> and
					experimenting with <span className="text-tokyo-night-orange">system design</span>, each
					project represents a unique challenge I&apos;ve tackled and learned from. 💡
				</p>
				<p>
					I focus on creating <span className="text-tokyo-night-cyan">practical solutions</span> to
					real-world problems while exploring new technologies and best practices. Many of these
					projects are <span className="text-tokyo-night-magenta">open-source</span>, allowing
					others to learn from and build upon them! 🌟
				</p>
			</div>

			<div>
				<p>My projects typically involve:</p>
				<ul className="list-disc">
					<li>
						<span className="text-tokyo-night-cyan">Full-Stack Applications</span>: From concept to
						deployment
					</li>
					<li>
						<span className="text-tokyo-night-cyan">Automation Tools</span>: Simplifying repetitive
						tasks
					</li>
					<li>
						<span className="text-tokyo-night-cyan">System Design</span>: Architecting scalable
						solutions
					</li>
					<li>
						<span className="text-tokyo-night-cyan">Developer Tools</span>: Improving the
						development experience
					</li>
					<li>And many more exciting builds! 🚀</li>
				</ul>
			</div>

			<div>
				<p>
					Each project comes with detailed documentation, tech stack information, and links to both
					live demos and source code. I believe in{" "}
					<span className="text-tokyo-night-orange">learning in public</span> and sharing knowledge
					with the community. 📚
				</p>
			</div>

			<div>
				<p>
					Interested in collaborating or have questions about any project?{" "}
					<span className="text-tokyo-night-cyan">Reach out</span> through any of the social links -
					I&apos;m always excited to discuss tech and potential collaborations! 🤝
				</p>
			</div>

			<div>
				<p>
					Ready to explore? <span className="text-tokyo-night-cyan">Browse</span> through the
					projects section to see detailed breakdowns of each build! 🔍
				</p>
			</div>
		</div>
	);
}
