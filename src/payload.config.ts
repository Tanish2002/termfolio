// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Experiences } from "./payload/collections/Experiences";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Projects } from "./payload/collections/Projects";
import { Socials } from "./payload/collections/Socials";
import { Tags } from "./payload/collections/Tags";
import { TechStacks } from "./payload/collections/TechStacks";
import { Users } from "./payload/collections/Users";
import { defaultLexical } from "./payload/fields/defaultLexical";
import { SocialLinks } from "./payload/globals/Socials";
import { plugins } from "./payload/plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    components: {
      afterLogin: ["/payload/components/Admin/OAuthLoginButton.tsx#default"],
      beforeLogin: ["/payload/components/Admin/DashBoardInfo.tsx#default"],
      beforeDashboard: ["/payload/components/Admin/Revalidate.tsx#default"]
    },
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900
        }
      ]
    }
  },
  plugins: [...plugins],
  collections: [Users, Media, Tags, Posts, Experiences, Projects, TechStacks, Socials],
  globals: [SocialLinks],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ""
    }
  }),
  sharp
});
