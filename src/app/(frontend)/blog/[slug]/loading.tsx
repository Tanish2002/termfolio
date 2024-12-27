import React from "react";

export default function Loading() {
  return (
    <article className="md:prose-md prose mx-auto w-full max-w-4xl px-4 py-8 lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-headings:text-tokyo-night-orange sm:px-6 lg:px-8">
      {/* Header Loading Skeleton */}
      <header className="mb-8 space-y-4">
        {/* Title Loading */}
        <div className="h-16 w-[85%] rounded bg-tokyo-night-dark-cyan/10"></div>

        {/* Metadata Section */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {/* Tags Loading */}
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-24 rounded-md bg-tokyo-night-cyan/10"
              ></div>
            ))}
          </div>

          {/* Date Loading */}
          <div className="h-7 w-32 rounded bg-tokyo-night-red/10"></div>
        </div>
      </header>

      {/* Content Loading */}
      <div className="space-y-12">
        {/* First paragraph block */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-5 rounded bg-tokyo-night-comment/10"
              style={{ width: `${90 + Math.random() * 10}%` }}
            ></div>
          ))}
        </div>

        {/* H2 heading */}
        <div className="h-8 w-64 rounded bg-tokyo-night-orange/10"></div>

        {/* More paragraphs */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-5 rounded bg-tokyo-night-comment/10"
              style={{ width: `${85 + Math.random() * 15}%` }}
            ></div>
          ))}
        </div>

        {/* Another H2 */}
        <div className="h-8 w-56 rounded bg-tokyo-night-orange/10"></div>

        {/* Final paragraphs */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-5 rounded bg-tokyo-night-comment/10"
              style={{ width: `${80 + Math.random() * 20}%` }}
            ></div>
          ))}
        </div>
      </div>
    </article>
  );
}
