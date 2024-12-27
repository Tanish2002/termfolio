// src/app/(frontend)/blog/loading.tsx
export default function Loading() {
  return (
    <div className="prose-xl my-auto space-y-4 prose-p:my-0">
      {/* Archive Toggle Button */}
      <div className="flex items-center justify-end">
        <div className="ml-auto mr-2 h-10 w-32 animate-pulse rounded-md bg-tokyo-night-cyan/10" />
      </div>

      {/* Introduction Text */}
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />

        <div className="space-y-2">
          <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
          <div className="h-6 w-5/6 rounded bg-tokyo-night-foreground/10" />
        </div>

        {/* Topics Section */}
        <div className="space-y-2">
          <div className="h-6 w-1/2 rounded bg-tokyo-night-foreground/10" />
          <ul className="list-disc space-y-2 pl-6">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />
            ))}
          </ul>
        </div>

        <div className="h-6 w-5/6 rounded bg-tokyo-night-foreground/10" />
      </div>
    </div>
  );
}
