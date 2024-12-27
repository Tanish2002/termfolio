import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import { BaseList } from "@/components/Lists/BaseList";
import { BaseListItem } from "@/components/Lists/types";

export const dynamic = "force-static";

async function Experience() {
  const items = await queryItems();
  return <BaseList divIndex={2} items={items} boxText="experience" />;
}
const queryItems = unstable_cache(
  async () => {
    const { isEnabled: draft } = await draftMode();

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: "experiences",
      draft,
      overrideAccess: draft,
      pagination: false,
      select: {
        title: true,
        company: true,
        slug: true,
        endDate: true
      },
      sort: "-endDate",
      where: {
        _status: {
          equals: "published"
        }
      }
    });
    const transformedItems: BaseListItem[] = result.docs.map((item) => ({
      leftContent: item.title.trim(),
      rightContent: item.company.trim(),
      href: "/experience/" + item.slug?.trim()
    }));

    return transformedItems;
  },
  ["experience-list"],
  { tags: ["experience-list"] }
);

export default Experience;
