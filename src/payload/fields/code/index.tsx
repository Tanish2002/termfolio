"use client";

import React, { useEffect, useState } from "react";

import { CodeField, useFormFields } from "@payloadcms/ui";
import { CodeFieldClientProps } from "payload";

const CodeComponent: React.FC<CodeFieldClientProps> = ({ field, path }) => {
  const laguageField = useFormFields(([fields, _]) => fields.language);
  const [languageValue, setLanguage] = useState(laguageField.value as string);

  useEffect(() => {
    setLanguage(laguageField.value as string);
  }, [laguageField]);

  return (
    <CodeField
      path={path}
      key={"code-field-" + (languageValue || "javascript")}
      field={{
        name: path,
        admin: {
          language: languageValue, // Dynamically use the selected language value
          editorOptions: field.admin?.editorOptions || {} // Pass any editor options as needed
        }
      }}
    />
  );
};

export default CodeComponent;
