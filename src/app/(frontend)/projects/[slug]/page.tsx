import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import { Media } from "@/payload/components/Media";
import RichText from "@/payload/components/RichText";
import cn from "@/utils/cn";
import { generateMeta } from "@/utils/generateMeta";

type Args = {
	params: Promise<{
		slug?: string;
	}>;
};

export const dynamic = "force-static";

export default async function ProjectPage({ params }: Args) {
	const { slug = "" } = await params;
	const project = await queryProjectBySlug({ slug });

	if (!project) return notFound();

	return (
		<article
			className={cn(
				"md:prose-md prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-headings:text-tokyo-night-orange prose-a:no-underline",
				"mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
			)}
		>
			{/* Project Header */}
			<header className="mb-8 space-y-4">
				{/* Title */}
				<h1 className="font-bold leading-tight">{project.title}</h1>

				{/* Metadata Section with Responsive Layout */}
				<div className="flex flex-col items-start justify-between space-y-2 text-sm sm:flex-row sm:items-center sm:space-y-0">
					{/* Tags Section - Responsive Wrapping */}
					<div className="flex flex-wrap items-center gap-2">
						{project.tags?.map((tag) => {
							if (typeof tag === "object" && tag !== null) {
								return (
									<span
										key={tag.id}
										className="rounded-md bg-tokyo-night-darker-purple px-2 py-1 text-tokyo-night-foreground"
									>
										{tag.name}
									</span>
								);
							}
						})}
					</div>

					{/* Project Links */}
					<div className="flex flex-wrap items-center gap-2">
						{project.projectLink && (
							<Link
								href={project.projectLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 rounded-md bg-tokyo-night-blue/10 px-3 py-1 text-tokyo-night-blue transition-colors duration-200 hover:bg-tokyo-night-blue/20"
							>
								<FaExternalLinkAlt className="mr-1" />
								Live
							</Link>
						)}
						{project.githubLink && (
							<Link
								href={project.githubLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 rounded-md bg-tokyo-night-green/10 px-3 py-1 text-tokyo-night-green transition-colors duration-200 hover:bg-tokyo-night-green/20"
							>
								<FaGithub className="mr-1" />
								GitHub Repository
							</Link>
						)}
					</div>
				</div>

				{/* Project Banner Image */}
				{project.projectBanner && <Media resource={project.projectBanner} />}
			</header>

			{/* Project Content with Enhanced Readability */}
			<RichText
				className="prose-h2:border-b"
				data={project.content}
				enableProse
				enableGutter={false}
			/>
		</article>
	);
}

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const projects = await payload.find({
		collection: "projects",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true
		}
	});

	const params = projects.docs.map(({ slug }) => {
		return { slug };
	});

	return params;
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "projects",
		draft,
		limit: 1,
		overrideAccess: draft,
		pagination: false,
		where: {
			slug: {
				equals: slug
			}
		}
	});

	return result.docs?.[0] || null;
});

export async function generateMetadata({ params }: Args): Promise<Metadata> {
	const { slug = "" } = await params;
	const post = await queryProjectBySlug({ slug });

	return generateMeta({ doc: post, type: "projects" });
}
