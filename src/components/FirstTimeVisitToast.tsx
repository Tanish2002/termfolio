"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "react-hot-toast";

import { isFirstVisit, markAsVisited } from "@/utils/firstVisit";

export function FirstVisitToast() {
  const router = useRouter();

  useEffect(() => {
    if (isFirstVisit()) {
      markAsVisited();
      toast.custom((t: any) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } rounded border border-tokyo-night-blue bg-tokyo-night-background p-4 shadow-lg`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="font-medium text-tokyo-night-cyan">Welcome!</h3>
              <p className="mt-1 text-sm text-tokyo-night-foreground">
                Using default font and theme.
              </p>
              <p className="text-sm text-tokyo-night-foreground">
                Having trouble reading? Customize display settings
              </p>
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                router.push("/settings");
              }}
              className="rounded bg-tokyo-night-cyan px-3 py-2 text-sm text-tokyo-night-background transition-opacity hover:opacity-90"
            >
              Settings
            </button>
          </div>
        </div>
      ));
    }
  }, [router]);
  return null;
}
