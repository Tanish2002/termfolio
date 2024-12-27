import cn from "@/utils/cn";

export default function Loading() {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl bg-tokyo-night-background px-4 py-8 sm:px-6 lg:px-8",
      )}
    >
      {/* Header section with title, company and date */}
      <div className="my-1 flex items-center justify-between md:my-2 lg:my-3">
        <div>
          {/* Title skeleton - using orange to match the heading */}
          <div className="mb-2 mt-1 h-12 w-64 animate-pulse rounded-lg bg-tokyo-night-orange/10 md:mb-3 md:mt-2 md:h-16 md:w-96 lg:mb-4 lg:mt-3 lg:h-20 lg:w-[500px]" />

          {/* Company name skeleton - using magenta to match the company name */}
          <div className="my-1 h-6 w-48 animate-pulse rounded-lg bg-tokyo-night-magenta/10 md:my-2 md:h-8 md:w-64 lg:my-3 lg:h-12 lg:w-80" />
        </div>

        {/* Date range skeleton - using the code background color */}
        <div className="h-6 w-32 animate-pulse rounded-lg bg-tokyo-night-magenta/10 md:h-8 md:w-40 lg:h-10 lg:w-48" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {/* Paragraph skeletons - using the code background color */}
        <div className="h-4 animate-pulse rounded bg-tokyo-night-code-background" />
        <div className="h-4 w-[95%] animate-pulse rounded bg-tokyo-night-code-background" />
        <div className="h-4 w-[90%] animate-pulse rounded bg-tokyo-night-code-background" />

        {/* List items skeletons */}
        <div className="mt-8 h-4 w-48 animate-pulse rounded-lg bg-tokyo-night-orange/10 md:h-6 md:w-64 lg:h-10 lg:w-80" />
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-5 w-[85%] animate-pulse rounded bg-tokyo-night-code-background" />
            <div className="h-4 w-[80%] animate-pulse rounded bg-tokyo-night-code-background" />
            <div className="h-4 w-[75%] animate-pulse rounded bg-tokyo-night-code-background" />
          </div>
        ))}

        {/* Technical stack section skeleton */}
        <div className="mt-8 h-4 w-48 animate-pulse rounded-lg bg-tokyo-night-orange/10 md:h-6 md:w-64 lg:h-10 lg:w-80" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-[70%] animate-pulse rounded bg-tokyo-night-code-background" />
            <div className="h-4 w-[65%] animate-pulse rounded bg-tokyo-night-code-background" />
          </div>
        ))}
      </div>
    </div>
  );
}
