import { Project } from "@/payload-types";
import { createRevalidateHooks } from "@/utils/revalidateDocument";

export const { onChange: revalidateProject, onDelete: revalidateDelete } =
  createRevalidateHooks<Project>({
    type: "projects",
    tags: ["projects-sitemap", "projects-list"],
  });
