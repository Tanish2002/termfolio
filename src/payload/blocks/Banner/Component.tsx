import React from "react";

import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

import type { BannerBlock as BannerBlockProps } from "@/payload-types";
import RichText from "@/payload/components/RichText";
import cn from "@/utils/cn";

type Props = {
  className?: string;
} & BannerBlockProps;

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  const icon = {
    info: <FaInfoCircle className="mr-3 text-lg text-tokyo-night-blue" />,
    error: <FaTimesCircle className="mr-3 text-lg text-tokyo-night-red" />,
    success: <FaCheckCircle className="mr-3 text-lg text-tokyo-night-green" />,
    warning: <FaExclamationTriangle className="mr-3 text-lg text-tokyo-night-yellow" />
  };

  return (
    <div className={cn("mx-auto my-8 w-full", className)}>
      <div
        className={cn("flex items-center rounded border px-6 py-3", {
          "border-tokyo-night-blue bg-tokyo-night-blue/30": style === "info",
          "border-tokyo-night-red bg-tokyo-night-red/30": style === "error",
          "border-tokyo-night-green bg-tokyo-night-green/30": style === "success",
          "border-tokyo-night-yellow bg-tokyo-night-yellow/30": style === "warning"
        })}
      >
        <div className="flex w-full items-center">
          {icon[style]}
          <RichText
            className={cn("flex-1 text-sm font-medium leading-relaxed", {
              "text-tokyo-night-blue": style === "info",
              "text-tokyo-night-red": style === "error",
              "text-tokyo-night-green": style === "success",
              "text-tokyo-night-yellow": style === "warning"
            })}
            data={content}
            enableGutter={false}
            enableProse={false}
          />
        </div>
      </div>
    </div>
  );
};
