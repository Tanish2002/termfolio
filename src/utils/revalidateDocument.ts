import { revalidatePath, revalidateTag } from "next/cache";

import { CollectionAfterChangeHook, CollectionAfterDeleteHook, TypeWithID } from "payload";

type RevalidateParams<T extends TypeWithID = any> = Parameters<CollectionAfterChangeHook<T>>[0] & {
  type: string;
  tags: string[];
};

const revalidatePathsAndTags = <T extends TypeWithID>({
  type,
  doc,
  previousDoc,
  req,
  tags
}: RevalidateParams<T>) => {
  const { context, payload } = req;
  if (!context.disableRevalidate) {
    if ((doc as any)._status === "published") {
      const path = `/${type}/${(doc as any).slug}`;
      payload.logger.info(`Revalidating ${type} at path: ${path}`);
      revalidatePath(path);
      tags.forEach((tag) => revalidateTag(tag));
    }

    if ((previousDoc as any)?._status === "published" && (doc as any)._status !== "published") {
      const oldPath = `/${type}/${(previousDoc as any).slug}`;
      payload.logger.info(`Revalidating old ${type} at path: ${oldPath}`);
      revalidatePath(oldPath);
      tags.forEach((tag) => revalidateTag(tag));
    }
  }
};

type RevalidateDeleteParams<T extends TypeWithID = any> = Parameters<
  CollectionAfterDeleteHook<T>
>[0] & {
  type: string;
  tags: string[];
};

const revalidateDeleteHook = <T extends TypeWithID = any>({
  type,
  doc,
  context,
  tags
}: RevalidateDeleteParams<T>) => {
  if (!context.disableRevalidate) {
    const path = `/${type}/${(doc as any).slug}`; // idk why this gives error so typecasting to any for now
    revalidatePath(path);
    tags.forEach((tag) => revalidateTag(tag));
  }
};

type RevalidateConfig = {
  type: string;
  tags: string[];
};

export function createRevalidateHooks<T extends TypeWithID>(config: RevalidateConfig) {
  const onChange: CollectionAfterChangeHook<T> = (props) => {
    revalidatePathsAndTags<T>({
      ...props,
      ...config
    });
    return props.doc;
  };

  const onDelete: CollectionAfterDeleteHook<T> = (props) => {
    revalidateDeleteHook<T>({
      ...props,
      ...config
    });
    return props.doc;
  };

  return { onChange, onDelete };
}
