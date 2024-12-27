"use client";

import { useState } from "react";

import { HiOutlineNewspaper } from "react-icons/hi";
import { ImTerminal } from "react-icons/im";
import { toast } from "sonner";

import BorderBox from "@/components/BorderBox/BorderBox";
import { updateUserFont } from "@/lib/userSettings/client";

import { FontOption } from "./FontForm";
import FontShowcase from "./FontPreview";

export default function FontFormClient({
  initialFont,
  previewMdxComponent
}: {
  initialFont: FontOption;
  previewMdxComponent: React.ReactNode;
}) {
  const [font, setFont] = useState<FontOption>(initialFont);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUserFont({ font });

    // Show a custom toast notification
    toast.success("Font settings saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Choose Site Font</label>

        <ul className="grid w-full gap-6 md:grid-cols-2">
          <li className="h-full">
            <input
              type="radio"
              id="font-scientifica"
              name="font"
              value="font-scientifica"
              checked={font === "scientifica"}
              onChange={() => setFont("scientifica")}
              className="peer hidden"
              required
            />
            <label
              htmlFor="font-scientifica"
              className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">Scientifica</div>
                <div className="w-full">Terminal like font, Recommended for best experience</div>
              </div>
              <ImTerminal />
            </label>
          </li>
          <li className="h-full">
            <input
              type="radio"
              id="font-mono"
              name="font"
              value="font-mono"
              checked={font === "mono"}
              onChange={() => setFont("mono")}
              className="peer hidden"
            />
            <label
              htmlFor="font-mono"
              className="inline-flex h-full w-full cursor-pointer items-center justify-between border border-tokyo-night-selection p-5 text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 peer-checked:border-tokyo-night-magenta peer-checked:text-tokyo-night-magenta"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">Victor Mono</div>
                <div className="w-full">
                  Common Mono font, use it if you have difficulty reading scientifica
                </div>
              </div>
              <HiOutlineNewspaper />
            </label>
          </li>
        </ul>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="w-full rounded border border-tokyo-night-selection bg-tokyo-night-background px-6 py-3 text-lg font-semibold text-tokyo-night-foreground hover:bg-tokyo-night-comment/30 hover:text-tokyo-night-magenta focus:outline-none focus:ring-2 focus:ring-tokyo-night-magenta md:w-auto"
          >
            Save Font
          </button>
        </div>

        {/* Font Preview */}
        <div className="my-4">
          <BorderBox>
            <div className={"bg-tokyo-night-background p-4 text-tokyo-night-foreground"}>
              <h3 className="mb-2 text-lg font-bold underline">Font Preview</h3>
              <FontShowcase font={font} previewMdxComponent={previewMdxComponent} />
            </div>
          </BorderBox>
        </div>
      </div>
    </form>
  );
}
