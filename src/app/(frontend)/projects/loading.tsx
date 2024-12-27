// src/app/(frontend)/projects/loading.tsx
export default function Loading() {
  return (
    <div className="prose-xl my-auto space-y-4 prose-p:my-0">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />

        <div className="space-y-2">
          <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
          <div className="h-6 w-5/6 rounded bg-tokyo-night-foreground/10" />
        </div>

        {/* Project Types Section */}
        <div className="space-y-2">
          <div className="h-6 w-1/2 rounded bg-tokyo-night-foreground/10" />
          <ul className="list-disc space-y-2 pl-6">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="h-6 w-full rounded bg-tokyo-night-foreground/10" />
          <div className="h-6 w-4/5 rounded bg-tokyo-night-foreground/10" />
        </div>

        <div className="h-6 w-3/4 rounded bg-tokyo-night-foreground/10" />
      </div>
    </div>
  );
}
