"use client";

import { useEffect } from "react";

import { PluginComponent } from "@payloadcms/richtext-lexical";
import type {
  ElementNode,
  LexicalEditor,
  LexicalNode,
  TextNode
} from "@payloadcms/richtext-lexical/lexical";
import {
  $createTextNode,
  $getSelection,
  $isElementNode,
  $isLineBreakNode,
  $isNodeSelection,
  $isRangeSelection,
  $isTextNode,
  TextNode as TextNodeValue
} from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils";

import { ClientProps } from "../..";
import {
  $createAutoColorTextNode,
  $isAutoColorTextNode,
  AutoColorTextNode
} from "../../../nodes/AutoColorTextNode";
import { $createColorTextNode, $isColorTextNode } from "../../../nodes/ColorTextNode";
import { ColorTextFields } from "../../../nodes/types";

interface ColorTextMatcherResult {
  fields?: ColorTextFields;
  index: number;
  length: number;
  text: string;
  color: string;
}

type ChangeHandler = (url: null | string, prevUrl: null | string) => void;

interface ColorTextMatcherResult {
  fields?: ColorTextFields;
  index: number;
  length: number;
  text: string;
  color: string;
}

export type ColorTextMatcher = (text: string) => ColorTextMatcherResult | null;

function createColorMatcher(): ColorTextMatcher {
  return (text: string) => {
    const match = COLOR_SPAN_REGEX.exec(text);
    if (match === null) {
      return null;
    }
    return {
      index: match.index,
      length: match[0].length,
      text: match[2], // The inner text
      color: match[1] // The color class or className
    };
  };
}

function findFirstMatch(text: string, matchers: ColorTextMatcher[]): ColorTextMatcherResult | null {
  for (let i = 0; i < matchers.length; i++) {
    const match = matchers[i](text);

    if (match != null) {
      return match;
    }
  }

  return null;
}

const PUNCTUATION_OR_SPACE = /[.,;\s]/;

function isSeparator(char: string): boolean {
  return PUNCTUATION_OR_SPACE.test(char);
}

function endsWithSeparator(textContent: string): boolean {
  return isSeparator(textContent[textContent.length - 1]);
}

function startsWithSeparator(textContent: string): boolean {
  return isSeparator(textContent[0]);
}

/**
 * Check if the text content starts with a fullstop followed by a top-level domain.
 * Meaning if the text content can be a beginning of a top level domain.
 * @param textContent
 * @param isEmail
 * @returns boolean
 */
function startsWithTLD(textContent: string, isEmail: boolean): boolean {
  if (isEmail) {
    return /^\.[a-z]{2,}/i.test(textContent);
  } else {
    return /^\.[a-z0-9]+/i.test(textContent);
  }
}

function isPreviousNodeValid(node: LexicalNode): boolean {
  let previousNode = node.getPreviousSibling();
  if ($isElementNode(previousNode)) {
    previousNode = previousNode.getLastDescendant();
  }
  return (
    previousNode === null ||
    $isLineBreakNode(previousNode) ||
    ($isTextNode(previousNode) && endsWithSeparator(previousNode.getTextContent()))
  );
}

function isNextNodeValid(node: LexicalNode): boolean {
  let nextNode = node.getNextSibling();
  if ($isElementNode(nextNode)) {
    nextNode = nextNode.getFirstDescendant();
  }
  return (
    nextNode === null ||
    $isLineBreakNode(nextNode) ||
    ($isTextNode(nextNode) && startsWithSeparator(nextNode.getTextContent()))
  );
}

function isContentAroundIsValid(
  matchStart: number,
  matchEnd: number,
  text: string,
  nodes: TextNode[]
): boolean {
  const contentBeforeIsValid =
    matchStart > 0 ? isSeparator(text[matchStart - 1]) : isPreviousNodeValid(nodes[0]);
  if (!contentBeforeIsValid) {
    return false;
  }

  const contentAfterIsValid =
    matchEnd < text.length ? isSeparator(text[matchEnd]) : isNextNodeValid(nodes[nodes.length - 1]);
  return contentAfterIsValid;
}

function extractMatchingNodes(
  nodes: TextNode[],
  startIndex: number,
  endIndex: number
): [
  matchingOffset: number,
  unmodifiedBeforeNodes: TextNode[],
  matchingNodes: TextNode[],
  unmodifiedAfterNodes: TextNode[]
] {
  const unmodifiedBeforeNodes: TextNode[] = [];
  const matchingNodes: TextNode[] = [];
  const unmodifiedAfterNodes: TextNode[] = [];
  let matchingOffset = 0;

  let currentOffset = 0;
  const currentNodes = [...nodes];

  while (currentNodes.length > 0) {
    const currentNode = currentNodes[0];
    const currentNodeText = currentNode.getTextContent();
    const currentNodeLength = currentNodeText.length;
    const currentNodeStart = currentOffset;
    const currentNodeEnd = currentOffset + currentNodeLength;

    if (currentNodeEnd <= startIndex) {
      unmodifiedBeforeNodes.push(currentNode);
      matchingOffset += currentNodeLength;
    } else if (currentNodeStart >= endIndex) {
      unmodifiedAfterNodes.push(currentNode);
    } else {
      matchingNodes.push(currentNode);
    }
    currentOffset += currentNodeLength;
    currentNodes.shift();
  }
  return [matchingOffset, unmodifiedBeforeNodes, matchingNodes, unmodifiedAfterNodes];
}

function $createAutoLinkNode_(
  nodes: TextNode[],
  startIndex: number,
  endIndex: number,
  match: ColorTextMatcherResult
): TextNode | undefined {
  const fields = {
    textColor: match.color,
    ...match.fields
  } as ColorTextFields;

  const linkNode = $createColorTextNode({ fields });
  if (nodes.length === 1) {
    let remainingTextNode = nodes[0];
    let linkTextNode: TextNode;
    if (startIndex === 0) {
      [linkTextNode, remainingTextNode] = remainingTextNode.splitText(endIndex);
    } else {
      [, linkTextNode, remainingTextNode] = remainingTextNode.splitText(startIndex, endIndex);
    }
    const textNode = $createTextNode(match.text);
    textNode.setFormat(linkTextNode.getFormat());
    textNode.setDetail(linkTextNode.getDetail());
    textNode.setStyle(linkTextNode.getStyle());
    linkNode.append(textNode);
    linkTextNode.replace(linkNode);
    return remainingTextNode;
  } else if (nodes.length > 1) {
    const firstTextNode = nodes[0];
    let offset = firstTextNode.getTextContent().length;
    let firstLinkTextNode;
    if (startIndex === 0) {
      firstLinkTextNode = firstTextNode;
    } else {
      [, firstLinkTextNode] = firstTextNode.splitText(startIndex);
    }
    const linkNodes: LexicalNode[] = [];
    let remainingTextNode;
    for (let i = 1; i < nodes.length; i++) {
      const currentNode = nodes[i];
      const currentNodeText = currentNode.getTextContent();
      const currentNodeLength = currentNodeText.length;
      const currentNodeStart = offset;
      const currentNodeEnd = offset + currentNodeLength;
      if (currentNodeStart < endIndex) {
        if (currentNodeEnd <= endIndex) {
          linkNodes.push(currentNode);
        } else {
          const [linkTextNode, endNode] = currentNode.splitText(endIndex - currentNodeStart);
          linkNodes.push(linkTextNode);
          remainingTextNode = endNode;
        }
      }
      offset += currentNodeLength;
    }
    const selection = $getSelection();
    const selectedTextNode = selection ? selection.getNodes().find($isTextNode) : undefined;
    const textNode = $createTextNode(firstLinkTextNode.getTextContent());
    textNode.setFormat(firstLinkTextNode.getFormat());
    textNode.setDetail(firstLinkTextNode.getDetail());
    textNode.setStyle(firstLinkTextNode.getStyle());
    linkNode.append(textNode, ...linkNodes);
    // it does not preserve caret position if caret was at the first text node
    // so we need to restore caret position
    if (selectedTextNode && selectedTextNode === firstLinkTextNode) {
      if ($isRangeSelection(selection)) {
        textNode.select(selection.anchor.offset, selection.focus.offset);
      } else if ($isNodeSelection(selection)) {
        textNode.select(0, textNode.getTextContent().length);
      }
    }
    firstLinkTextNode.replace(linkNode);
    return remainingTextNode;
  }
  return undefined;
}

function $handleLinkCreation(
  nodes: TextNode[],
  matchers: ColorTextMatcher[],
  onChange: ChangeHandler
): void {
  let currentNodes = [...nodes];
  const initialText = currentNodes.map((node) => node.getTextContent()).join("");
  let text = initialText;

  let match;
  let invalidMatchEnd = 0;

  while ((match = findFirstMatch(text, matchers)) != null && match !== null) {
    const matchStart: number = match.index;
    const matchLength: number = match.length;
    const matchEnd = matchStart + matchLength;
    const isValid = isContentAroundIsValid(
      invalidMatchEnd + matchStart,
      invalidMatchEnd + matchEnd,
      initialText,
      currentNodes
    );

    if (isValid) {
      const [matchingOffset, , matchingNodes, unmodifiedAfterNodes] = extractMatchingNodes(
        currentNodes,
        invalidMatchEnd + matchStart,
        invalidMatchEnd + matchEnd
      );

      const actualMatchStart = invalidMatchEnd + matchStart - matchingOffset;
      const actualMatchEnd = invalidMatchEnd + matchEnd - matchingOffset;
      const remainingTextNode = $createAutoLinkNode_(
        matchingNodes,
        actualMatchStart,
        actualMatchEnd,
        match
      );
      currentNodes = remainingTextNode
        ? [remainingTextNode, ...unmodifiedAfterNodes]
        : unmodifiedAfterNodes;
      onChange(match.url, null);
      invalidMatchEnd = 0;
    } else {
      invalidMatchEnd += matchEnd;
    }

    text = text.substring(matchEnd);
  }
}

function handleColorTextEdit(
  linkNode: AutoColorTextNode,
  matchers: ColorTextMatcher[],
  onChange: ChangeHandler
): void {
  // Check children are simple text
  const children = linkNode.getChildren();
  const childrenLength = children.length;
  for (let i = 0; i < childrenLength; i++) {
    const child = children[i];
    if (!$isTextNode(child) || !child.isSimpleText()) {
      replaceWithChildren(linkNode);
      onChange(null, linkNode.getFields()?.textColor ?? null);
      return;
    }
  }

  // Check text content fully matches
  const text = linkNode.getTextContent();
  const match = findFirstMatch(text, matchers);
  if (match === null || match.text !== text) {
    replaceWithChildren(linkNode);
    onChange(null, linkNode.getFields()?.textColor ?? null);
    return;
  }

  // Check neighbors
  if (!isPreviousNodeValid(linkNode) || !isNextNodeValid(linkNode)) {
    replaceWithChildren(linkNode);
    onChange(null, linkNode.getFields()?.textColor ?? null);
    return;
  }

  const textColor = linkNode.getFields()?.textColor;
  if (textColor !== match?.color) {
    const flds = linkNode.getFields();
    flds.textColor = match?.color;
    linkNode.setFields(flds);
    onChange(match.color, textColor ?? null);
  }
}

// Bad neighbors are edits in neighbor nodes that make AutoLinks incompatible.
// Given the creation preconditions, these can only be simple text nodes.
function handleBadNeighbors(
  textNode: TextNode,
  matchers: ColorTextMatcher[],
  onChange: ChangeHandler
): void {
  const previousSibling = textNode.getPreviousSibling();
  const nextSibling = textNode.getNextSibling();
  const text = textNode.getTextContent();

  if ($isAutoColorTextNode(previousSibling)) {
    if (!startsWithSeparator(text)) {
      previousSibling.append(textNode);
      handleColorTextEdit(previousSibling, matchers, onChange);
      onChange(null, previousSibling.getFields()?.textColor ?? null);
    }
  }

  if ($isAutoColorTextNode(nextSibling) && !endsWithSeparator(text)) {
    replaceWithChildren(nextSibling);
    handleColorTextEdit(nextSibling, matchers, onChange);
    onChange(null, nextSibling.getFields()?.textColor ?? null);
  }
}

function replaceWithChildren(node: ElementNode): LexicalNode[] {
  const children = node.getChildren();
  const childrenLength = children.length;

  for (let j = childrenLength - 1; j >= 0; j--) {
    node.insertAfter(children[j]);
  }

  node.remove();
  return children.map((child) => child.getLatest());
}

function getTextNodesToMatch(textNode: TextNode): TextNode[] {
  // check if next siblings are simple text nodes till a node contains a space separator
  const textNodesToMatch = [textNode];
  let nextSibling = textNode.getNextSibling();
  while (nextSibling !== null && $isTextNode(nextSibling) && nextSibling.isSimpleText()) {
    textNodesToMatch.push(nextSibling);
    if (/\s/.test(nextSibling.getTextContent())) {
      break;
    }
    nextSibling = nextSibling.getNextSibling();
  }
  return textNodesToMatch;
}

function useAutoLink(
  editor: LexicalEditor,
  matchers: ColorTextMatcher[],
  onChange?: ChangeHandler
): void {
  useEffect(() => {
    if (!editor.hasNodes([AutoColorTextNode])) {
      throw new Error("LexicalAutoLinkPlugin: AutoLinkNode not registered on editor");
    }

    const onChangeWrapped = (url: null | string, prevUrl: null | string): void => {
      if (onChange != null) {
        onChange(url, prevUrl);
      }
    };

    return mergeRegister(
      editor.registerNodeTransform(TextNodeValue, (textNode: TextNode) => {
        const parent = textNode.getParentOrThrow();
        const previous = textNode.getPreviousSibling();
        if ($isAutoColorTextNode(parent)) {
          handleColorTextEdit(parent, matchers, onChangeWrapped);
        } else if (!$isColorTextNode(parent)) {
          if (
            textNode.isSimpleText() &&
            (startsWithSeparator(textNode.getTextContent()) || !$isAutoColorTextNode(previous))
          ) {
            const textNodesToMatch = getTextNodesToMatch(textNode);
            $handleLinkCreation(textNodesToMatch, matchers, onChangeWrapped);
          }

          handleBadNeighbors(textNode, matchers, onChangeWrapped);
        }
      })
    );
  }, [editor, matchers, onChange]);
}

const COLOR_SPAN_REGEX = /<span\s+(?:class|className)="([^"]+)">([^<]+)<\/span>/g;
const MATCHERS = [createColorMatcher()];

export const AutoColorTextPlugin: PluginComponent<ClientProps> = () => {
  const [editor] = useLexicalComposerContext();

  useAutoLink(editor, MATCHERS);

  return null;
};
