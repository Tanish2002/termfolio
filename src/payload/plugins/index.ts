import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Plugin } from "payload";
import { OAuth2Plugin } from "payload-oauth2";

import { Experience, Post, Project } from "@/payload-types";
import { getServerSideURL } from "@/utils/getURL";

import { Experiences } from "../collections/Experiences";
import { Posts } from "../collections/Posts";
import { Projects } from "../collections/Projects";
import { cloudinaryStorage } from "./cloudinary";

const generateTitle: GenerateTitle<Post | Experience | Project> = ({ doc, collectionSlug }) => {
  switch (collectionSlug) {
    case "projects":
      return doc?.title ? `${doc.title} | Projects | bakaotaku.dev` : "Projects | bakaotaku.dev";
    case "posts":
      return doc?.title ? `${doc.title} | Blog | bakaotaku.dev` : "Blog | bakaotaku.dev";
    case "experiences":
      return doc?.title
        ? `${doc.title} | Experience | bakaotaku.dev`
        : "Experience | bakaotaku.dev";
    default:
      return "bakaotaku.dev";
  }
};

const generateURL: GenerateURL<Post | Experience | Project> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL();
  switch (collectionSlug) {
    case "projects":
      return doc?.slug ? `${url}/projects/${doc.slug}` : url;
    case "posts":
      return doc?.slug ? `${url}/blog/${doc.slug}` : url;
    case "experiences":
      return doc?.slug ? `${url}/experience/${doc.slug}` : url;
    default:
      return url;
  }
};

export const plugins: Plugin[] = [
  OAuth2Plugin({
    enabled: true,
    strategyName: "github",
    useEmailAsIdentity: true,
    serverURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    clientId: process.env.GITHUB_CLIENT_ID || "Ov23litEWAQgmvtTr6wa",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "c563b81dfc789b1576b30306915ce64b2a6e704d",
    authCollection: "users",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    scopes: ["read:user", "user:email"],
    providerAuthorizationUrl: "https://github.com/login/oauth/authorize",
    getUserInfo: async (accessToken: string) => {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accessToken}`,
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });

      const user = await response.json();
      return { email: user.email, sub: user.id };
    },
    successRedirect: (req) => {
      req.payload.logger.info("Logged In, Redirectnig to /admin");
      return "/admin";
    },
    failureRedirect: (req, error) => {
      req.payload.logger.error({ msg: "failureRedirect", error });
      return "/login";
    }
  }),
  seoPlugin({
    collections: [Posts.slug, Experiences.slug, Projects.slug],
    generateTitle,
    generateURL
  }),
  cloudinaryStorage({
    enabled: true,
    collections: {
      ["media"]: true
    },
    folder: process.env.CLOUDINARY_CLOUD_NAME,
    config: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    }
  }),
  payloadCloudPlugin()
];
