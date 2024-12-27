import configPromise from "@payload-config";
import { getPayload } from "payload";

import Blog from "../page";

export default Blog;

export const dynamic = "force-static"; // keep this static so actual content is also static

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "posts",
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
