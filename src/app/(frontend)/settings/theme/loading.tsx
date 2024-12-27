// src/app/(frontend)/settings/theme/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <h1 className="mb-6 h-10 w-48 rounded bg-tokyo-night-orange/10"></h1>

      {/* Theme Options Grid */}
      <div className="mt-6">
        <div className="mb-2 h-6 w-36 rounded bg-tokyo-night-foreground/10"></div>
        <ul className="grid w-full gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="h-32 rounded border border-tokyo-night-selection bg-tokyo-night-comment/5"
            ></li>
          ))}
        </ul>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        <div className="h-12 w-32 rounded bg-tokyo-night-comment/10"></div>
      </div>

      {/* Preview Section */}
      <div className="my-4">
        <div className="rounded border-2 border-tokyo-night-selection p-4">
          <div className="mb-4 h-8 w-48 rounded bg-tokyo-night-orange/10"></div>

          {/* Color Preview Sections */}
          {[1, 2, 3].map((section) => (
            <div key={section} className="mb-6">
              <div className="mb-3 h-6 w-32 rounded bg-tokyo-night-foreground/10"></div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 rounded bg-tokyo-night-comment/5"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
