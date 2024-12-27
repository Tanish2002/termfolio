import { revalidateTag } from "next/cache";

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

import type { Techstack } from "@/payload-types";

export const revalidateSocials: CollectionAfterChangeHook<Techstack> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating socials list`);
    revalidateTag("socials-list");
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Techstack> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("socials-list");
  }

  return doc;
};
