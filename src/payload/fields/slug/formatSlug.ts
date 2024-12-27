import type { FieldHook } from "payload";

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

export const formatSlugHook =
  (fallback: string | string[]): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === "string") {
      return formatSlug(value);
    }

    if (operation === "create" || !data?.slug) {
      if (typeof fallback === "string") {
        const fallbackData = data?.[fallback];

        if (fallbackData && typeof fallbackData === "string") {
          return formatSlug(fallbackData);
        }
      } else if (Array.isArray(fallback)) {
        const fallbackValues = fallback
          .map((key) => (typeof data?.[key] === "string" ? formatSlug(data[key]) : ""))
          .filter(Boolean);

        if (fallbackValues.length > 0) {
          return fallbackValues.join("-");
        }
      }
    }

    return value;
  };
