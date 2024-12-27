import React from "react";

import cn from "@/utils/cn";

import BorderBox from "../BorderBox/BorderBox";

interface BaseListSkeletonProps {
  count?: number;
  boxText: string;
}

export const BaseListSkeleton: React.FC<BaseListSkeletonProps> = ({ count = 10, boxText }) => {
  return (
    <BorderBox texts={[{ textYPosition: "top", textXPosition: "left", text: boxText }]}>
      <ul className="w-full space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <li
            key={`skeleton-item-${index}`}
            className="flex w-full animate-pulse justify-between bg-tokyo-night-dark-blue/10 p-0.5 transition-colors hover:bg-tokyo-night-selection/10"
          >
            <div className="h-6 w-1/3 rounded"></div>
            <div
              className={cn("h-6 w-1/4 rounded", {
                // "bg-tokyo-night-orange/10": index === 0 // first item orange
              })}
            ></div>
          </li>
        ))}
      </ul>
    </BorderBox>
  );
};
