import { Experience } from "@/payload-types";
import { createRevalidateHooks } from "@/utils/revalidateDocument";

export const { onChange: revalidateExperience, onDelete: revalidateDelete } =
  createRevalidateHooks<Experience>({
    type: "experience",
    tags: ["experience-sitemap", "experience-list"]
  });
