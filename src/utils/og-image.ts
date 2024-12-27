// utils/og-image.ts
import { Experience, Media, Post, Project } from "@/payload-types";

export function generateOgImageUrl(
  item: Partial<Project> | Partial<Post> | Partial<Experience>,
  type: "projects" | "posts" | "experience"
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://termfolio.bakaotaku.dev";

  const title = item.title || "";

  // Create base params
  const params = new URLSearchParams({
    type,
    title
  });

  switch (type) {
    case "posts": {
      const postDoc: Partial<Post> = item;
      handleTags(postDoc.tags, params);
      params.set("createdAt", postDoc.createdAt || "");
      break;
    }
    case "projects": {
      const projectDoc: Partial<Project> = item;
      handleTags(projectDoc.tags, params);

      const banner = projectDoc.projectBanner;

      // Handle different possible banner formats
      if (typeof banner === "object" && banner !== null) {
        const bannerUrl =
          typeof banner === "object" && "url" in banner ? (banner as Media).url : undefined;

        if (bannerUrl) {
          params.set("image", baseUrl + bannerUrl);
        }
      } else if (typeof banner === "string") {
        params.set("image", banner);
      }
      break;
    }
    case "experience": {
      const _experienceDoc: Partial<Experience> = item; // Nothing special to do here for now
      break;
    }
    default:
      throw new Error("Invalid type");
  }

  return `${baseUrl}/api/og?${params.toString()}`;
}

function handleTags(tags: Project["tags"] | Post["tags"], params: URLSearchParams) {
  const tagNames = (tags || [])
    // .slice(0, 3)
    .map((tag) =>
      typeof tag === "object" && tag !== null && "name" in tag ? tag.name : String(tag)
    )
    .filter((tag) => tag)
    .join(",");

  if (tagNames) {
    params.set("tags", tagNames);
  }
}
