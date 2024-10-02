import { readItems } from "@directus/sdk";
import { MDXRemote } from "next-mdx-remote/rsc";
import slugify from "slugify";

import client from "@/lib/directus";
import cn from "@/utils/cn";
import monthRange from "@/utils/monthRange";

export const dynamicParams = false;

export default async function Experience() {
	const experienceData = (
		await client.request(
			readItems("Experience", {
				fields: ["Experience", "Title", "Company", "Start_Date", "End_Date"]
			})
		)
	)[0];

	return (
		<div className="prose-lg my-auto space-y-4 prose-p:my-0">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="my-1 text-tokyo-night-orange">{experienceData.Title}</h2>
					<h3 className="text-tokyo-night-magenta">@{experienceData.Company}</h3>
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
			fields: ["Title", "Company"]
		})
	);

	return posts.map((post) => ({
		slug: slugify(`${post.Title} ${post.Company}`)
	}));
}
