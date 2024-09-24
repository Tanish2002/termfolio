import React from "react";

const ListSkeleton: React.FC = () => {
  return (
    <ul className="space-y-2 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <li
          key={`skeleton-item-${index}`}
          className="animate-pulse p-0.5 w-full transition-colors flex justify-between"
        >
          <div className="h-4 bg-tokyo-night-comment rounded w-1/3"></div>
          <div className="h-4 bg-tokyo-night-comment rounded w-1/4"></div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(ListSkeleton)
