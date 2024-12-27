"use client";

import { useEffect } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext.js";
import { mergeRegister } from "@lexical/utils";
import { PluginComponent } from "@payloadcms/richtext-lexical";
import { COMMAND_PRIORITY_LOW } from "lexical";

import { ClientProps } from "../..";
import { AutoColorTextNode } from "../../../nodes/AutoColorTextNode";
import {
  $toggleLink,
  TOGGLE_COLOR_COMMAND,
} from "../../../nodes/ColorTextNode";
import { ColorTextPayload } from "../floatingColorEditor/types";

export const ColorTextPlugin: PluginComponent<ClientProps> = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([AutoColorTextNode])) {
      throw new Error(
        "ColorTextPlugin: ColorTextNode not registered on editor",
      );
    }
    return mergeRegister(
      editor.registerCommand(
        TOGGLE_COLOR_COMMAND,
        (payload: ColorTextPayload) => {
          $toggleLink(payload);
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  return null;
};
