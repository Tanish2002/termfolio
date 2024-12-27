import {
  convertLexicalNodesToHTML,
  createNode,
  createServerFeature,
} from "@payloadcms/richtext-lexical";
import type {
  Config,
  Field,
  FieldAffectingData,
  FieldSchemaMap,
  SanitizedConfig,
} from "payload";
import { sanitizeFields } from "payload";

import { ClientProps } from "../client";
import { AutoColorTextNode } from "../nodes/AutoColorTextNode";
import { ColorTextNode } from "../nodes/ColorTextNode";
import { getBaseFields } from "./baseFields";

export interface colorMap {
  label: string;
  className: string;
}

export type ExclusiveTextColorCollectionProps = {
  enabledColors: colorMap[];
};

export type TextColorFeatureServerProps = {
  fields?:
    | ((args: {
        config: SanitizedConfig;
        defaultFields: FieldAffectingData[];
      }) => (Field | FieldAffectingData)[])
    | Field[];
} & ExclusiveTextColorCollectionProps;

export const ColorTextFeature = createServerFeature<
  ExclusiveTextColorCollectionProps,
  TextColorFeatureServerProps,
  ClientProps
>({
  feature: async ({ config: _config, isRoot, parentIsLocalized, props }) => {
    const validRelationships = _config.collections.map((c) => c.slug) || [];

    const sanitizedProps: TextColorFeatureServerProps = props;
    const _transformedFields = getBaseFields(props.enabledColors);

    // Strip any functions or non-serializable data from fields
    const sanitizedFields = await sanitizeFields({
      config: _config as unknown as Config,
      fields: _transformedFields as Field[],
      parentIsLocalized,
      requireFieldLevelRichTextEditor: isRoot,
      validRelationships,
    });

    const sanitizedFieldsWithoutText = sanitizedFields.filter(
      (field) => !("name" in field) || field.name !== "text",
    );

    // Remove any fields that might have functions
    // sanitizedFields = sanitizedFields.map(field => ({
    //   ...field,
    //   admin: {
    //     ...field.admin,
    //     components: undefined,  // Remove any custom components
    //   },
    //   hooks: undefined,  // Remove any hooks
    //   validate: undefined,  // Remove any validate functions
    // })) as Field[]
    sanitizedProps.fields = sanitizedFields;

    return {
      // ClientFeature: '@payloadcms/richtext-lexical/client#LinkFeatureClient',
      ClientFeature: {
        path: "/payload/features/colorText/client",
        exportName: "ColorTextFeatureClient",
        // clientProps: {
        //   'enabledColors': sanitizedProps.enabledColors
        // }
      },
      clientFeatureProps: {
        enabledColors: sanitizedProps.enabledColors,
      } as ExclusiveTextColorCollectionProps,
      generateSchemaMap: () => {
        const schemaMap: FieldSchemaMap = new Map();

        schemaMap.set("fields", {
          fields: sanitizedFields,
        });

        return schemaMap;
      },
      nodes: [
        createNode({
          node: AutoColorTextNode,
          converters: {
            html: {
              converter: async ({
                converters,
                currentDepth,
                depth,
                draft,
                node,
                overrideAccess,
                parent,
                req,
                showHiddenFields,
              }) => {
                const childrenText = await convertLexicalNodesToHTML({
                  converters,
                  currentDepth,
                  depth,
                  draft,
                  lexicalNodes: node.children,
                  overrideAccess,
                  parent: {
                    ...node,
                    parent,
                  },
                  req,
                  showHiddenFields,
                });
                const className = node.fields.textColor;
                return `<span class="${className}">${childrenText}</span>`;
              },
              nodeTypes: [AutoColorTextNode.getType()],
            },
          },
        }),
        createNode({
          node: ColorTextNode,
          converters: {
            html: {
              converter: async ({
                converters,
                currentDepth,
                depth,
                draft,
                node,
                overrideAccess,
                parent,
                req,
                showHiddenFields,
              }) => {
                const childrenText = await convertLexicalNodesToHTML({
                  converters,
                  currentDepth,
                  depth,
                  draft,
                  lexicalNodes: node.children,
                  overrideAccess,
                  parent: {
                    ...node,
                    parent,
                  },
                  req,
                  showHiddenFields,
                });

                const className = node.fields.textColor;

                return `<span class="${className}">${childrenText}</span>`;
              },
              nodeTypes: [ColorTextNode.getType()],
            },
          },
          getSubFields: () => {
            return sanitizedFieldsWithoutText;
          },
          getSubFieldsData: ({ node }) => {
            return node?.fields;
          },
        }),
      ],
      sanitizedServerFeatureProps: sanitizedProps,
    };
  },
  key: "colorText",
});
