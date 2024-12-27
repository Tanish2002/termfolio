"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BlogHeader() {
  const searchParams = useSearchParams();
  const status = (
    ["published", "archived"].includes(searchParams.get("status") || "")
      ? searchParams.get("status")!
      : "published"
  ) as "published" | "archived";

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/blog?status=${status === "archived" ? "published" : "archived"}`}
        className="ml-auto mr-2 rounded-md bg-tokyo-night-cyan px-4 py-2 text-base text-tokyo-night-background transition-colors hover:bg-tokyo-night-cyan/80"
      >
        Toggle {status === "archived" ? "Latest" : "Archived"} Posts
      </Link>
    </div>
  );
}
