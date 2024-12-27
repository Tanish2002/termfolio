import type { CollectionConfig } from "payload";

import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    // Only admins can create users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelf,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin
  },
  admin: {
    defaultColumns: ["email", "roles"],
    useAsTitle: "email",
    group: "Misc"
  },
  auth: true,
  fields: [
    {
      name: "roles",
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: "select",
      hasMany: true,
      defaultValue: ["viewer"],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      options: [
        {
          label: "Admin",
          value: "admin"
        },
        {
          label: "Viewer",
          value: "viewer"
        }
      ]
    },
    {
      name: "sub",
      type: "text",
      admin: {
        hidden: true
      }
    }
  ],
  timestamps: true
};
