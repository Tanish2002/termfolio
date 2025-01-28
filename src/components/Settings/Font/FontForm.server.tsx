import FontFormClient from "./FontForm.client";
import BasePreview from "./PreviewContent.server";

export default async function FontForm() {
  return (
    <FontFormClient
      previews={{
        scientifica: <BasePreview fontName="scientifica" />,
        mono: <BasePreview fontName="mono" />
      }}
    />
  );
}
