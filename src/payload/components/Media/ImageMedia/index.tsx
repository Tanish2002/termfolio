import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import React from "react";

import type { Media } from "@/payload-types";
import cn from "@/utils/cn";
import { cssVariables } from "@/utils/cssVariables";
import { getServerSideURL } from "@/utils/getURL";

import type { Props as MediaProps } from "../types";

const { breakpoints } = cssVariables;

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur =
  "data:image/png;base64,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";

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource === "object") {
    const mediaResource = resource as Media;

    // Prefer url over thumbnailURL, with fallback logic
    const imageUrl =
      mediaResource.url ||
      mediaResource.thumbnailURL ||
      mediaResource.sizes?.medium?.url ||
      mediaResource.sizes?.large?.url ||
      "";

    width =
      mediaResource.width ||
      mediaResource.sizes?.large?.width ||
      mediaResource.sizes?.medium?.width ||
      undefined;

    height =
      mediaResource.height ||
      mediaResource.sizes?.large?.height ||
      mediaResource.sizes?.medium?.height ||
      undefined;

    alt = altFromProps || mediaResource.alt || "";

    src = `${getServerSideURL()}${imageUrl}`;
  }

  const loading = loadingFromProps || "lazy";

  // Improved sizes logic using available image sizes
  const sizes = sizeFromProps || generateSizes((resource as Media).sizes);

  return (
    <picture className="flex justify-center">
      <NextImage
        alt={alt || ""}
        className={cn(imgClassName, "rounded-sm border border-tokyo-night-selection")}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  );
};

// Generate responsive sizes based on available image variants
function generateSizes(sizes?: Media["sizes"]): string {
  if (!sizes) return "100vw";

  // Filter and sort available sizes, handling potential null values
  const sortedSizes = Object.entries(sizes)
    .filter(([, sizeInfo]) => sizeInfo?.width && sizeInfo.url)
    .map(([key, sizeInfo]) => ({
      key,
      width: sizeInfo!.width!,
      url: sizeInfo!.url!
    }))
    .sort((a, b) => a.width - b.width);

  // Generate sizes using breakpoints and available image sizes
  const sizeRules = sortedSizes
    .map((sizeInfo) => {
      const breakpoint = getBreakpointForSize(sizeInfo.key);
      return breakpoint ? `(max-width: ${breakpoint}px) ${sizeInfo.width}px` : "";
    })
    .filter(Boolean);

  // Add a fallback for the largest size or 100vw if no specific sizes found
  const fallbackSize = sortedSizes[sortedSizes.length - 1]?.width || 0;
  const fallbackRule = fallbackSize > 0 ? `${fallbackSize}px` : "100vw";

  return [...sizeRules, fallbackRule].join(", ");
}

// Map size keys to appropriate breakpoints
function getBreakpointForSize(sizeKey: string): number | undefined {
  const sizeBreakpointMap: Record<string, keyof typeof breakpoints> = {
    thumbnail: "sm",
    square: "sm",
    small: "md",
    medium: "lg",
    large: "xl",
    xlarge: "2xl",
    og: "3xl"
  };

  const breakpointKey = sizeBreakpointMap[sizeKey];
  return breakpointKey ? breakpoints[breakpointKey] : undefined;
}
