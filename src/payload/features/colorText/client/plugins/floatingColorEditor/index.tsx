"use client";

import * as React from "react";

import { PluginComponentWithAnchor } from "@payloadcms/richtext-lexical";
import { createPortal } from "react-dom";

import { ClientProps } from "../..";
import { ColorEditor } from "./ColorEditor";

export const FloatingColorTextEditorPlugin: PluginComponentWithAnchor<
  ClientProps
> = (props) => {
  const { anchorElem = document.body } = props;
  return createPortal(<ColorEditor anchorElem={anchorElem} />, anchorElem);
};
