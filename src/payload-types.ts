/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    media: Media;
    tags: Tag;
    posts: Post;
    experiences: Experience;
    projects: Project;
    techstacks: Techstack;
    socials: Social;
    users: User;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    media: MediaSelect<false> | MediaSelect<true>;
    tags: TagsSelect<false> | TagsSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    experiences: ExperiencesSelect<false> | ExperiencesSelect<true>;
    projects: ProjectsSelect<false> | ProjectsSelect<true>;
    techstacks: TechstacksSelect<false> | TechstacksSelect<true>;
    socials: SocialsSelect<false> | SocialsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'social-links': SocialLink;
  };
  globalsSelect: {
    'social-links': SocialLinksSelect<false> | SocialLinksSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xlarge?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  tags?: (number | Tag)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  archived?: boolean | null;
  publishedAt?: string | null;
  authors?: (number | User)[] | null;
  readTime?: string | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  roles?: ('admin' | 'viewer')[] | null;
  sub?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiences".
 */
export interface Experience {
  id: number;
  title: string;
  company: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  startDate: string;
  endDate: string;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: number;
  title: string;
  projectBanner?: (number | null) | Media;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  projectLink?: string | null;
  githubLink?: string | null;
  tags?: (number | Tag)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  projectType:
    | 'web development'
    | 'mobile development'
    | 'desktop application'
    | 'native mobile app'
    | 'hybrid mobile app'
    | 'cross platform app'
    | 'enterprise software'
    | 'backend service'
    | 'api service'
    | 'microservice'
    | 'cloud infrastructure'
    | 'data pipeline'
    | 'machine learning'
    | 'ai application'
    | 'data visualization'
    | 'cli tool'
    | 'browser extension'
    | 'automation tool'
    | 'development tool'
    | 'open-source library'
    | 'open-source contribution'
    | 'iot application'
    | 'research prototype';
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "techstacks".
 */
export interface Techstack {
  id: number;
  name: string;
  enabled?: boolean | null;
  logo_family:
    | 'ci'
    | 'fa6'
    | 'io'
    | 'io5'
    | 'md'
    | 'ti'
    | 'go'
    | 'fi'
    | 'gi'
    | 'wi'
    | 'di'
    | 'ai'
    | 'bs'
    | 'ri'
    | 'pi'
    | 'fc'
    | 'gr'
    | 'hi'
    | 'hi2'
    | 'si'
    | 'sl'
    | 'im'
    | 'bi'
    | 'cg'
    | 'vsc'
    | 'tb'
    | 'tfi';
  logo_name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials".
 */
export interface Social {
  id: number;
  name: string;
  link: string;
  enabled?: boolean | null;
  logo_family:
    | 'ci'
    | 'fa6'
    | 'io'
    | 'io5'
    | 'md'
    | 'ti'
    | 'go'
    | 'fi'
    | 'gi'
    | 'wi'
    | 'di'
    | 'ai'
    | 'bs'
    | 'ri'
    | 'pi'
    | 'fc'
    | 'gr'
    | 'hi'
    | 'hi2'
    | 'si'
    | 'sl'
    | 'im'
    | 'bi'
    | 'cg'
    | 'vsc'
    | 'tb'
    | 'tfi';
  logo_name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'tags';
        value: number | Tag;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'experiences';
        value: number | Experience;
      } | null)
    | ({
        relationTo: 'projects';
        value: number | Project;
      } | null)
    | ({
        relationTo: 'techstacks';
        value: number | Techstack;
      } | null)
    | ({
        relationTo: 'socials';
        value: number | Social;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        square?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        small?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        medium?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        large?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        xlarge?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        og?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags_select".
 */
export interface TagsSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  tags?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  archived?: T;
  publishedAt?: T;
  authors?: T;
  readTime?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experiences_select".
 */
export interface ExperiencesSelect<T extends boolean = true> {
  title?: T;
  company?: T;
  content?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  startDate?: T;
  endDate?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects_select".
 */
export interface ProjectsSelect<T extends boolean = true> {
  title?: T;
  projectBanner?: T;
  content?: T;
  projectLink?: T;
  githubLink?: T;
  tags?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  projectType?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "techstacks_select".
 */
export interface TechstacksSelect<T extends boolean = true> {
  name?: T;
  enabled?: T;
  logo_family?: T;
  logo_name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "socials_select".
 */
export interface SocialsSelect<T extends boolean = true> {
  name?: T;
  link?: T;
  enabled?: T;
  logo_family?: T;
  logo_name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  roles?: T;
  sub?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links".
 */
export interface SocialLink {
  id: number;
  socialMedia: {
    /**
     * Twitter/X profile URL
     */
    twitter: string;
    /**
     * LinkedIn profile URL
     */
    linkedin: string;
    /**
     * GitHub profile URL
     */
    github: string;
  };
  resume: {
    /**
     * Resume URL
     */
    url: string;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links_select".
 */
export interface SocialLinksSelect<T extends boolean = true> {
  socialMedia?:
    | T
    | {
        twitter?: T;
        linkedin?: T;
        github?: T;
      };
  resume?:
    | T
    | {
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BannerBlock".
 */
export interface BannerBlock {
  style: 'info' | 'warning' | 'error' | 'success';
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'banner';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeBlock".
 */
export interface CodeBlock {
  language?:
    | (
        | 'typescript'
        | 'javascript'
        | 'css'
        | 'html'
        | 'shell'
        | 'nix'
        | 'haskell'
        | 'lua'
        | 'go'
        | 'rust'
        | 'cpp'
        | 'csharp'
      )
    | null;
  codeContent: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'code';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MediaBlock".
 */
export interface MediaBlock {
  media: number | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'mediaBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}