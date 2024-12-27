import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import RichText from "@/payload/components/RichText";
import cn from "@/utils/cn";
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
    <div className={cn("mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8")}>
      <div className="my-1 flex items-center justify-between md:my-2 lg:my-3">
        <div>
          <h1 className="mb-2 mt-1 text-3xl text-tokyo-night-orange md:mb-3 md:mt-2 md:text-5xl lg:mb-4 lg:mt-3 lg:text-7xl">
            {experienceData.title.trim()}
          </h1>
          <h2 className="my-1 text-xl text-tokyo-night-magenta md:my-2 md:text-2xl lg:my-3 lg:text-4xl">
            @{experienceData.company.trim()}
          </h2>
        </div>
        <h3 className="md:text-xl lg:text-2xl">
          {monthRange(experienceData.startDate!, experienceData.endDate!)}
        </h3>
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
