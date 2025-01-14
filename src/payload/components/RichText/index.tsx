import Link from "next/link";

import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedListItemNode,
  SerializedListNode
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
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

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  link: ({ node }) => {
    const children = convertLexicalNodesToJSX({
      converters: defaultConverters,
      parent: node,
      nodes: node.children
    });
    if (node.fields.linkType === "internal") {
      const slug = (node.fields.doc?.value as any).slug;
      const collectionName = node.fields.doc?.relationTo;

      return <Link href={`/${collectionName}/${slug}`}>{children}</Link>;
    }
    return <Link href={node.fields.url}>{children}</Link>;
  },
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

/**
 * Normalize children of a list to use HTML stacking without needing any CSS quirks.
 *
 * Note: changes a single level, call again for sublists while rendering.
 *
 * @param children children of a list
 * @returns
 */
function fixListItemNesting(children: SerializedLexicalNode[]) {
  const res: SerializedLexicalNode[] = [];

  for (const node of children) {
    //validate
    if (node.type !== "listitem") {
      //unexpected item found
      res.push(node);
      continue;
    }

    //check li > ol, li > ul
    const listItemNode = node as SerializedListItemNode;
    const children = listItemNode.children;

    if (children.length === 1 && children[0].type === "list" && res.length > 0) {
      const prev = res.pop() as SerializedListNode;

      // @ts-ignore
      if (prev.type !== "listitem") {
        res.push(prev);
        res.push(node);
        continue;
      }

      res.push({
        ...prev,

        children: [...prev.children, children[0]]
      } as SerializedListNode);

      continue;
    }

    res.push(node);
  }
  return res;
}
