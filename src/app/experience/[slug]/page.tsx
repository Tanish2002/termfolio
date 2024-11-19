import { readItems } from "@directus/sdk";
import { MDXRemote } from "next-mdx-remote/rsc";

import client from "@/lib/directus";
import cn from "@/utils/cn";
import monthRange from "@/utils/monthRange";

export default async function Experience({ params }: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	const experienceData = (
		await client.request(
			readItems("Experience", {
				fields: ["Experience", "Title", "Company", "Start_Date", "End_Date"],
				filter: {
					slug: {
						_eq: slug
					}
				}
			})
		)
	)[0];

	return (
		<div className="prose-lg my-auto space-y-4 prose-p:my-0">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="my-1 text-tokyo-night-orange">{experienceData.Title.trim()}</h2>
					<h3 className="text-tokyo-night-magenta">@{experienceData.Company.trim()}</h3>
				</div>
				<h3 className="my-0">{monthRange(experienceData.Start_Date, experienceData.End_Date)}</h3>
			</div>
			<MDXRemote
				source={experienceData.Experience}
				components={{
					ul: (props) => (
						<ul {...props} className={cn(props.className, "list-disc")}>
							{props.children}
						</ul>
					),
					h3: (props) => (
						<h3 {...props} className={cn(props.className, "text-tokyo-night-orange")}>
							{props.children}
						</h3>
					)
				}}
			/>
		</div>
	);
}

export async function generateStaticParams() {
	const posts = await client.request(
		readItems("Experience", {
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
