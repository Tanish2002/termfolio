import {
  LexicalRichTextAdapter,
  SanitizedServerEditorConfig,
  getEnabledNodes,
} from "@payloadcms/richtext-lexical";
import { $getRoot } from "@payloadcms/richtext-lexical/lexical";
import { createHeadlessEditor } from "@payloadcms/richtext-lexical/lexical/headless";
import { CollectionBeforeChangeHook, RichTextField } from "payload";

import { Post } from "@/payload-types";
import findFieldByName from "@/utils/findFieldByName";
import { createRevalidateHooks } from "@/utils/revalidateDocument";

export const { onChange: revalidatePost, onDelete: revalidateDelete } =
  createRevalidateHooks<Post>({
    type: "blog",
    tags: ["blog-sitemap", "blog-published-list", "blog-archived-list"], // Honestly here I should not revalidate both blog lists...
  });

export const addReadTime: CollectionBeforeChangeHook<Post> = ({
  data,
  collection,
  req: { payload },
}) => {
  const otherRichTextField: RichTextField = findFieldByName(
    collection.fields,
    "content",
  ) as RichTextField;

  const lexicalAdapter: LexicalRichTextAdapter =
    otherRichTextField.editor as LexicalRichTextAdapter;

  const sanitizedServerEditorConfig: SanitizedServerEditorConfig =
    lexicalAdapter.editorConfig;

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({
      editorConfig: sanitizedServerEditorConfig,
    }),
  });
  try {
    headlessEditor.update(
      () => {
        if (data.content)
          headlessEditor.setEditorState(
            headlessEditor.parseEditorState(data.content),
          );
      },
      { discrete: true }, // This should commit the editor state immediately
    );
  } catch (e) {
    payload.logger.error({ err: e }, "ERROR parsing editor state");
  }

  // Export to plain text
  const plainTextContent =
    headlessEditor.getEditorState().read(() => {
      return $getRoot().getTextContent();
    }) || "";
  const text = plainTextContent;
  const wordsPerMinute = 250;

  // Count the number of words in the text
  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;

  // Calculate reading time in minutes
  const readingTimeMinutes = wordCount / wordsPerMinute;

  // Round up to the nearest minute
  const roundedReadingTime = Math.ceil(readingTimeMinutes);

  return { ...data, readTime: roundedReadingTime.toString() };
};
