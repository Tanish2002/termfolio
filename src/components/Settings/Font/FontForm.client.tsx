"use client";

import { useState } from "react";

import { useAtom, useSetAtom } from "jotai";
import { toast } from "react-hot-toast";
import { HiOutlineNewspaper } from "react-icons/hi";
import { ImTerminal } from "react-icons/im";

import BorderBox from "@/components/BorderBox/BorderBox";
import { mono, scientifica } from "@/constants";
import { getCurrentFontCookie, setUserFont } from "@/lib/userSettings/client";
import { FontOption, fontAtom } from "@/store/fontAtom";

export default function FontFormClient({
  previews
}: {
  previews: Record<FontOption, React.ReactNode>;
}) {
  const [userFont, setUserFontAtom] = useAtom(fontAtom); // using atom here since I'm sure it gets updated in the UserSettingsProvider
  const [previewFont, setPreviewFont] = useState<FontOption>(userFont);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserFont(previewFont, setUserFontAtom);

    // Show a custom toast notification
    toast.custom((t: any) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } rounded border border-tokyo-night-blue bg-tokyo-night-background p-4 shadow-lg`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h3 className="font-medium text-tokyo-night-cyan">Settings Saved!</h3>
            <p className="mt-1 text-sm text-tokyo-night-foreground">Your font has been updated</p>
          </div>
        </div>
      </div>
    ));
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
              checked={previewFont === "scientifica"}
              onChange={() => setPreviewFont("scientifica")}
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
              checked={previewFont === "mono"}
              onChange={() => setPreviewFont("mono")}
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
            <div className="bg-tokyo-night-background p-4 text-tokyo-night-foreground">
              <h3 className="mb-2 text-lg font-bold underline">Font Preview</h3>
              <div
                className={`p-4 ${previewFont === "scientifica" ? scientifica.className : mono.className} prose-lg`}
              >
                {previews[previewFont]}
              </div>
            </div>
          </BorderBox>
        </div>
      </div>
    </form>
  );
}
