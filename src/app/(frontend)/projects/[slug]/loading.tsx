export default function Loading() {
  return (
    <article className="md:prose-md prose mx-auto w-full max-w-4xl px-4 py-8 lg:prose-lg xl:prose-xl 2xl:prose-2xl sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <header className="mb-8 space-y-4">
        {/* Title Skeleton */}
        <div className="h-12 w-3/4 animate-pulse rounded-lg bg-tokyo-night-orange/10" />

        {/* Metadata Section */}
        <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
          {/* Tags Skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-7 w-20 animate-pulse rounded-md bg-tokyo-night-darker-purple/20"
              />
            ))}
          </div>

          {/* Links Skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-24 animate-pulse rounded-md bg-tokyo-night-blue/10" />
            <div className="h-8 w-40 animate-pulse rounded-md bg-tokyo-night-green/10" />
          </div>
        </div>

        {/* Banner Image Skeleton */}
        <div className="aspect-video w-full animate-pulse rounded-lg bg-tokyo-night-foreground/10" />
      </header>

      {/* Content Skeleton */}
      <div className="space-y-8">
        {/* Section 1 */}
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse rounded-lg bg-tokyo-night-orange/10" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-tokyo-night-foreground/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-tokyo-night-foreground/10" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-tokyo-night-foreground/10" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse rounded-lg bg-tokyo-night-orange/10" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-tokyo-night-foreground/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-tokyo-night-foreground/10" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-tokyo-night-foreground/10" />
          </div>
        </div>

        {/* Bullet Points Section */}
        <div className="space-y-4 pl-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-tokyo-night-foreground/10" />
              <div className="h-4 w-full animate-pulse rounded bg-tokyo-night-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
