import { notFound } from "next/navigation";

import { readItems } from "@directus/sdk";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import Pre from "@/components/Blog/MdComponents/Pre";
import Span from "@/components/Blog/MdComponents/Span";
import client from "@/lib/directus";
import cn from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";

export default async function BlogPost({
	params,
	searchParams
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ status: "published" | "archived" }>;
}) {
	const slug = (await params).slug;
	const status = ["published", "archived"].includes((await searchParams).status)
		? (await searchParams).status
		: "published";

	const blogPostData = (
		await client.request(
			readItems("Blog", {
				fields: ["title", "content", "tags", "read_time", "date_created", "status"],
				filter: {
					slug: {
						_eq: slug
					},
					status: {
						_eq: status
					}
				}
			})
		)
	)[0];

	if (!blogPostData) {
		notFound();
	}

	return (
		<article className="prose prose-xl mx-auto w-full max-w-4xl px-4 py-8 prose-h1:text-tokyo-night-orange prose-h2:border-b prose-p:text-tokyo-night-foreground prose-a:text-tokyo-night-blue prose-strong:text-tokyo-night-foreground prose-li:text-tokyo-night-foreground sm:px-6 lg:px-8">
			{/* Blog Post Header */}
			<header className="mb-8 space-y-4">
				{/* Title with responsive text sizing */}
				<h1 className="font-bold leading-tight">{blogPostData.title}</h1>

				{/* Metadata Section with Responsive Layout */}
				<div className="flex flex-col items-start justify-between space-y-2 text-sm sm:flex-row sm:items-center sm:space-y-0">
					{/* Tags Section - Responsive Wrapping */}
					<div className="flex flex-wrap items-center gap-2">
						{blogPostData.tags.map((tag: string) => (
							<span
								key={tag}
								className="rounded-md bg-tokyo-night-darker-purple px-2 py-1 text-xs text-tokyo-night-foreground sm:text-sm"
							>
								{tag}
							</span>
						))}
					</div>

					{/* Metadata Details - Stacked on Small Screens */}
					<div className="flex flex-col items-start gap-2 text-tokyo-night-comment sm:flex-row sm:items-center sm:gap-4">
						{/* Date */}
						<time
							className="text-xs text-tokyo-night-red sm:text-sm"
							dateTime={blogPostData.date_created}
						>
							{formatDate(blogPostData.date_created)}
						</time>
					</div>
				</div>
			</header>

			{/* Blog Content with Enhanced Readability */}
			<div>
				<MDXRemote
					source={blogPostData.content}
					options={{
						mdxOptions: {
							rehypePlugins: [
								[
									rehypePrettyCode,
									{
										theme: { dark: "tokyo-night", light: "catppuccin-latte" }
									}
								]
							],

							format: "mdx"
						}
					}}
					components={{
						pre: Pre,
						span: Span,
						ul: (props) => (
							<ul {...props} className={cn(props.className, "list-disc space-y-2 pl-6 sm:pl-8")}>
								{props.children}
							</ul>
						),
						h2: (props) => (
							<h2 {...props} className={cn(props.className, "text-tokyo-night-orange")}>
								{props.children}
							</h2>
						),
						h3: (props) => (
							<h3 {...props} className={cn(props.className, "text-tokyo-night-orange")}>
								{props.children}
							</h3>
						),
						p: (props) => (
							<p
								{...props}
								className={cn(
									props.className
									// "leading-relaxed text-base sm:text-lg"
								)}
							>
								{props.children}
							</p>
						)
					}}
				/>
			</div>
		</article>
	);
}

export async function generateStaticParams() {
	const posts = await client.request(
		readItems("Blog", {
			fields: ["slug"],
			filter: {
				status: {
					_eq: "enabled"
				}
			}
		})
	);

	return posts.map(({ slug }) => ({ slug: slug.trim() }));
}
