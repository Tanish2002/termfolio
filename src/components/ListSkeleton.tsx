import React from "react";

const ListSkeleton: React.FC = () => {
  return (
    <ul className="w-full space-y-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <li
          key={`skeleton-item-${index}`}
          className="flex w-full animate-pulse justify-between p-0.5 transition-colors"
        >
          <div className="h-4 w-1/3 rounded bg-tokyo-night-comment"></div>
          <div className="h-4 w-1/4 rounded bg-tokyo-night-comment"></div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(ListSkeleton);
