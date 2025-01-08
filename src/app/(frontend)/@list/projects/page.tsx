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

    const customOrder: { [key: string]: number } = {
      "web development": 0,
      "mobile development": 1,
      "anything else": 2 // Grouping all other types under 'anything else'
    };

    // First, transform the items
    const transformedItems = result.docs.map((item) => ({
      leftContent: item.title.trim(),
      rightContent: item.projectType.trim(),
      href: "/projects/" + item.slug?.trim(),
      projectType: item.projectType.trim()
    }));

    transformedItems.sort((a, b) => {
      const aOrder =
        customOrder[a.projectType] !== undefined
          ? customOrder[a.projectType]
          : customOrder["anything else"];
      const bOrder =
        customOrder[b.projectType] !== undefined
          ? customOrder[b.projectType]
          : customOrder["anything else"];

      if (aOrder !== bOrder) return aOrder - bOrder; // If project type is different, order by customOrder
      return a.leftContent.localeCompare(b.leftContent); // Alphabetically sort within the same project type
    });

    return transformedItems;
  },
  ["project-list"],
  { tags: ["project-list"] }
);
