import { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    group: "Misc"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true
    }
  ]
};
