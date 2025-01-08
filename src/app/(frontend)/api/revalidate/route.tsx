// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${REVALIDATION_TOKEN}`) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { path, tag, type = "page" } = await request.json();

    if (path) {
      revalidatePath(path, type);
    }

    if (tag) {
      revalidateTag(tag);
    }

    return NextResponse.json(
      {
        revalidated: true,
        message: `Revalidation ${path ? `for path: ${path} (type: ${type})` : ""} ${tag ? `for tag: ${tag}` : ""} completed`
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
