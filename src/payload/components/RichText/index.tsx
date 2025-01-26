import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
  convertLexicalNodesToJSX
} from "@payloadcms/richtext-lexical/react";

import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps
} from "@/payload-types";
import { BannerBlock } from "@/payload/blocks/Banner/Component";
import CodeBlock, { CodeBlockProps } from "@/payload/blocks/Code/Component";
import { MediaBlock } from "@/payload/blocks/MediaBlock/Component";
import cn from "@/utils/cn";
import { collectionPrefixMap } from "@/constants";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  const collectionName = collectionPrefixMap[relationTo] || "/blog"
  return `${collectionName}/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  colorText: ({ node }) => {
    const children = convertLexicalNodesToJSX({
      converters: defaultConverters,
      parent: node,
      nodes: node.children
    });
    return <span className={`${node.fields.textColor}`}>{children}</span>;
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: async ({ node }) => (
      <MediaBlock imgClassName="m-0" {...node.fields} disableInnerContainer={true} />
    ),
    code: async ({ node }) => {
      return <CodeBlock {...node.fields} />;
    }
  }
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "md:prose-md prose mx-auto text-tokyo-night-foreground lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert":
            enableProse,
          "prose-a:text-tokyo-night-blue": enableProse,
          "prose-p:my-0 prose-strong:text-tokyo-night-foreground": enableProse,
          "prose-headings:text-tokyo-night-orange": enableProse,
          "prose-ul:list-disc prose-ul:space-y-2 prose-ul:pl-6 prose-ul:sm:pl-8": enableProse,
          "prose-ol:list-decimal prose-ol:space-y-2 prose-ol:pl-6 prose-ol:sm:pl-8": enableProse,
          "prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-tokyo-night-comment":
            enableProse
        },
        className
      )}
      {...rest}
    />
  );
}
