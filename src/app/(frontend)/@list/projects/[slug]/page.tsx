import configPromise from "@payload-config";
import { getPayload } from "payload";

import Project from "../page";

export const dynamic = "force-static";

export default Project;

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "projects",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true
		}
	});

	const params = posts.docs.map(({ slug }) => {
		return { slug };
	});

	return params;
}
