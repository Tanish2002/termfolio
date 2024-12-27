import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import RichText from "@/payload/components/RichText";
import { formatDate } from "@/utils/formatDate";
import { generateMeta } from "@/utils/generateMeta";

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export const dynamic = "force-static";

export default async function BlogPost({ params }: Args) {
  const { slug = "" } = await params;
  const post = await queryPostBySlug({ slug });

  if (!post) return notFound();

  return (
    <article className="md:prose-md prose mx-auto w-full max-w-4xl px-4 py-8 lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-headings:text-tokyo-night-orange sm:px-6 lg:px-8">
      {/* Blog Post Header */}
      <header className="mb-8 space-y-4">
        {/* Title with responsive text sizing */}
        <h1 className="font-bold leading-tight">{post.title}</h1>

        {/* Metadata Section with Responsive Layout */}
        <div className="flex flex-col items-start justify-between space-y-2 text-sm sm:flex-row sm:items-center sm:space-y-0">
          {/* Tags Section - Responsive Wrapping */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags?.map((tag) => {
              if (typeof tag === "object" && tag !== null) {
                return (
                  <span
                    key={tag.id}
                    className="rounded-md bg-tokyo-night-darker-purple px-2 py-1 text-xs text-tokyo-night-foreground sm:text-sm"
                  >
                    {tag.name}
                  </span>
                );
              }
            })}
          </div>

          {/* Metadata Details - Stacked on Small Screens */}
          <div className="flex flex-col items-start gap-2 text-tokyo-night-comment sm:flex-row sm:items-center sm:gap-4">
            {/* Date */}
            <time className="text-xs text-tokyo-night-red sm:text-sm" dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          </div>
        </div>
      </header>

      {/* Blog Content with Enhanced Readability */}
      <RichText
        className="prose-h2:border-b"
        data={post.content}
        enableProse
        enableGutter={false}
      />
    </article>
  );
}

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

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
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
  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post, type: "posts" });
}
