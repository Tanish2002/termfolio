import { revalidateTag } from "next/cache";

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import type { Techstack } from "@/payload-types";

export const revalidateTechStack: CollectionAfterChangeHook<Techstack> = ({
  doc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating techstacks list`);
    revalidateTag("techstack-list");
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Techstack> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("techstack-list");
  }

  return doc;
};
