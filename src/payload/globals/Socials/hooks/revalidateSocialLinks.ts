import { revalidatePath, revalidateTag } from "next/cache";

import type { GlobalAfterChangeHook } from "payload";

export const revalidateSocialLinks: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating social links`);
    revalidatePath("/");
    revalidateTag("social-links");
  }
  return doc;
};
