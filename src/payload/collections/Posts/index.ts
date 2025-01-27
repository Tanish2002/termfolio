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
  IndentFeature,
  InlineToolbarFeature,
  LinkFeature,
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

import { addReadTime, revalidateDelete, revalidatePost } from "./hooks/revalidatePost";

export const Posts: CollectionConfig<"posts"> = {
  slug: "posts",
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
    slug: true,
    tags: true,
    meta: {
      description: true
    }
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "posts"
        });

        return `${getServerSideURL()}${path}`;
      }
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "posts"
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
                    LinkFeature({
                      enabledCollections: ["posts"],
                      fields: ({ defaultFields }) => {
                        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                          if ("name" in field && field.name === "url") return false;
                          return true;
                        });

                        return [
                          ...defaultFieldsWithoutUrl,
                          {
                            name: "url",
                            type: "text",
                            admin: {
                              condition: ({ linkType }) => linkType !== "internal"
                            },
                            label: ({ t }) => t("fields:enterURL"),
                            required: true
                          }
                        ];
                      }
                    }),
                    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                    BlocksFeature({
                      blocks: [Banner, Code, MediaBlock],
                      inlineBlocks: [Banner, Code, MediaBlock]
                    }),
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
          fields: [
            {
              name: "tags",
              type: "relationship",
              admin: {
                position: "sidebar"
              },
              hasMany: true,
              relationTo: "tags"
            }
          ],
          label: "Meta"
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image"
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
      name: "archived",
      type: "checkbox",
      label: "Archived",
      defaultValue: false,
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime"
        },
        position: "sidebar"
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          }
        ]
      }
    },
    {
      name: "authors",
      type: "relationship",
      admin: {
        position: "sidebar"
      },
      hasMany: true,
      relationTo: "users"
    },
    {
      name: "readTime",
      type: "text",
      admin: {
        hidden: true
      }
    },
    ...slugField()
  ],
  hooks: {
    beforeChange: [addReadTime],
    afterChange: [revalidatePost],
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
