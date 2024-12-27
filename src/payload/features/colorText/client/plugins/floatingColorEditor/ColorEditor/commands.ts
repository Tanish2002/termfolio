"use client";

import {
  LexicalCommand,
  createCommand,
} from "@payloadcms/richtext-lexical/lexical";

import type { ColorTextPayload } from "../types.js";

export const TOGGLE_COLOR_WITH_MODAL_COMMAND: LexicalCommand<ColorTextPayload | null> =
  createCommand("TOGGLE_COLOR_WITH_MODAL_COMMAND");
