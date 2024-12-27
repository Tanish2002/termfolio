import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { BaseList } from "@/components/Lists/BaseList";

export const dynamic = "force-static";

export default async function Project() {
  const items = await queryItems();
  return <BaseList divIndex={2} items={items} boxText="projects" />;
}

const queryItems = unstable_cache(
  async () => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "projects",
      draft,
      overrideAccess: draft,
      pagination: false,
      select: {
        title: true,
        projectType: true,
        slug: true
      },
      sort: ["-createdAt"],
      where: {
        _status: {
          equals: "published"
        }
      }
    });
    const transformedItems = result.docs.map((item) => ({
      leftContent: item.title.trim(),
      rightContent: item.projectType.trim(),
      href: "/projects/" + item.slug?.trim()
    }));
    return transformedItems;
  },
  ["project-list"],
  { tags: ["project-list"] }
);
