import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import RichText from "@/payload/components/RichText";
import { generateMeta } from "@/utils/generateMeta";
import monthRange from "@/utils/monthRange";

type Args = {
	params: Promise<{
		slug?: string;
	}>;
};

export const dynamic = "force-static";

export default async function Experience({ params }: Args) {
	const { slug = "" } = await params;
	const experienceData = await queryExperienceBySlug({ slug });

	if (!experienceData) return notFound();

	return (
		<div className="prose-lg my-auto space-y-4 prose-p:my-0">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="my-1 text-tokyo-night-orange">{experienceData.title.trim()}</h2>
					<h3 className="text-tokyo-night-magenta">@{experienceData.company.trim()}</h3>
				</div>
				<h3 className="my-0">{monthRange(experienceData.startDate!, experienceData.endDate!)}</h3>
			</div>
			<RichText className="space-y-4" data={experienceData.content} enableGutter={false} />
		</div>
	);
}

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "experiences",
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

const queryExperienceBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "experiences",
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
	const post = await queryExperienceBySlug({ slug });

	return generateMeta({ doc: post, type: "experience" });
}
