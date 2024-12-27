// src/app/(frontend)/settings/font/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <h1 className="mb-6 h-10 w-48 rounded bg-tokyo-night-orange/10"></h1>

      {/* Font Options Grid */}
      <div>
        <div className="mb-2 h-6 w-36 rounded bg-tokyo-night-foreground/10"></div>
        <ul className="grid w-full gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
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

      {/* Font Preview */}
      <div className="my-4">
        <div className="rounded border-2 border-tokyo-night-selection p-4">
          <div className="mb-4 h-8 w-48 rounded bg-tokyo-night-orange/10"></div>

          {/* Preview Sections */}
          <div className="space-y-6">
            {/* Headings */}
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-6 rounded bg-tokyo-night-foreground/10"
                  style={{ width: `${100 - i * 15}%` }}
                ></div>
              ))}
            </div>

            {/* Text Styles */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 w-full rounded bg-tokyo-night-foreground/10"></div>
              ))}
            </div>

            {/* Lists */}
            <div className="space-y-2 pl-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 w-3/4 rounded bg-tokyo-night-foreground/10"></div>
              ))}
            </div>

            {/* Code Block */}
            <div className="h-24 rounded bg-tokyo-night-code-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
