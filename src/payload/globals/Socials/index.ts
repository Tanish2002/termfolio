import { GlobalConfig } from "payload";

import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { isAdmin } from "@/payload/access/isAdmin";

import { revalidateSocialLinks } from "./hooks/revalidateSocialLinks";

export const SocialLinks: GlobalConfig = {
  slug: "social-links",
  access: {
    read: authenticatedOrPublished,
    update: isAdmin
  },
  fields: [
    {
      name: "socialMedia",
      type: "group",
      fields: [
        {
          name: "twitter",
          type: "text",
          required: true,
          admin: {
            description: "Twitter/X profile URL"
          }
        },
        {
          name: "linkedin",
          type: "text",
          required: true,
          admin: {
            description: "LinkedIn profile URL"
          }
        },
        {
          name: "github",
          type: "text",
          required: true,
          admin: {
            description: "GitHub profile URL"
          }
        }
      ]
    },
    {
      name: "resume",
      type: "group",
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
          admin: {
            description: "Resume URL"
          }
        }
      ]
    }
  ],
  hooks: {
    afterChange: [revalidateSocialLinks]
  }
};
