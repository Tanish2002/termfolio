// src/app/(frontend)/loading.tsx
export default function Loading() {
  return (
    <>
      {/* Walking GIF placeholder */}
      <div className="relative h-32 w-full">
        <div className="absolute top-0 h-32 w-32 animate-pulse rounded bg-tokyo-night-foreground/10" />
      </div>

      <div className="prose-xl my-auto space-y-4">
        <div className="animate-pulse space-y-4">
          {/* Introduction */}
          <div className="h-6 w-2/3 rounded bg-tokyo-night-foreground/10" />

          {/* About Section */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
            <div className="h-6 w-5/6 rounded bg-tokyo-night-foreground/10" />
          </div>

          {/* DevOps Section */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
            <div className="h-6 w-5/6 rounded bg-tokyo-night-foreground/10" />
            <div className="h-6 w-4/5 rounded bg-tokyo-night-foreground/10" />
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />
            ))}
          </div>

          {/* Navigation Instructions */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
            <div className="h-6 w-4/5 rounded bg-tokyo-night-foreground/10" />
          </div>
        </div>
      </div>

      {/* Fortune Cookie placeholder */}
      <div className="prose-xl mx-auto my-2">
        <div className="border-2 border-tokyo-night-selection p-4">
          <div className="h-6 w-full animate-pulse rounded bg-tokyo-night-foreground/10" />
        </div>
      </div>
    </>
  );
}
