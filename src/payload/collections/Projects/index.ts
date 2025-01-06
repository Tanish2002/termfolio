import {
  MetaDescriptionField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from "@payloadcms/plugin-seo/fields";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

import { authenticatedOrPublished } from "@/payload/access/authenticatedOrPublished";
import { isAdmin } from "@/payload/access/isAdmin";
import { Banner } from "@/payload/blocks/Banner/config";
import { Code } from "@/payload/blocks/Code/config";
import { MediaBlock } from "@/payload/blocks/MediaBlock/config";
import { slugField } from "@/payload/fields/slug";
import { generatePreviewPath } from "@/utils/generatePreviewPath";
import { getServerSideURL } from "@/utils/getURL";

import { revalidateDelete, revalidateProject } from "./hooks/revalidateProject";

export const Projects: CollectionConfig<"projects"> = {
  slug: "projects",
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: authenticatedOrPublished,
    update: isAdmin
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    projectBanner: true,
    slug: true,
    tags: true,
    githubLink: true,
    projectLink: true
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "projects"
        });

        return `${getServerSideURL()}${path}`;
      }
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "projects"
      });

      return `${getServerSideURL()}${path}`;
    },
    useAsTitle: "title"
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true
    },
    {
      name: "projectBanner",
      label: "Project Banner",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
      filterOptions: {
        mimeType: { contains: "image" }
      }
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"]
                    }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature()
                  ];
                }
              }),
              label: false,
              required: true
            }
          ],
          label: "Content"
        },
        {
          label: "Meta",
          fields: [
            {
              name: "projectLink",
              type: "text",
              label: "Project Live Link",
              admin: {
                position: "sidebar"
              },
              validate: (value: string | null) =>
                !value || /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i.test(value) || "Invalid URL"
            },
            {
              name: "githubLink",
              type: "text",
              admin: {
                position: "sidebar"
              },
              validate: (value: string | null) =>
                !value ||
                /^https?:\/\/(www\.)?github\.com\/((orgs\/[A-Za-z0-9_.-]+\/repositories)|([A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)?))$/.test(
                  value
                ) ||
                "Invalid GitHub URL"
            },
            {
              name: "tags",
              type: "relationship",
              admin: {
                position: "sidebar"
              },
              hasMany: true,
              relationTo: "tags"
            }
          ]
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description"
            }),
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description"
            })
          ]
        }
      ]
    },
    {
      name: "projectType",
      label: "Project Type",
      type: "select",
      options: [
        { label: "Web Development", value: "web development" },
        { label: "Mobile Development", value: "mobile development" },
        { label: "Desktop Application", value: "desktop application" },
        { label: "Native Mobile App", value: "native mobile app" },
        { label: "Hybrid Mobile App", value: "hybrid mobile app" },
        { label: "Cross-platform App", value: "cross platform app" },
        { label: "Enterprise Software", value: "enterprise software" },
        { label: "Backend Service", value: "backend service" },
        { label: "API Service", value: "api service" },
        { label: "Microservice", value: "microservice" },
        { label: "Cloud Infrastructure", value: "cloud infrastructure" },
        { label: "Data Pipeline", value: "data pipeline" },
        { label: "Machine Learning", value: "machine learning" },
        { label: "AI Application", value: "ai application" },
        { label: "Data Visualization", value: "data visualization" },
        { label: "CLI Tool", value: "cli tool" },
        { label: "Browser Extension", value: "browser extension" },
        { label: "Automation Tool", value: "automation tool" },
        { label: "Development Tool", value: "development tool" },
        { label: "Open Source Library", value: "open-source library" },
        { label: "IoT Application", value: "iot application" },
        { label: "Research Prototype", value: "research prototype" }
      ],
      admin: {
        position: "sidebar"
      },
      required: true
    },
    ...slugField()
  ],
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100 // We set this interval for optimal live preview
      }
    },
    maxPerDoc: 10
  }
};
