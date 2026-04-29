import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidatePayload = {
  secret?: string;
  path?: string;
  paths?: string[];
  tag?: string;
  tags?: string[];
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as RevalidatePayload;
  const secret =
    payload.secret || request.nextUrl.searchParams.get("secret") || "";

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tags = [payload.tag, ...(payload.tags || [])].filter(
    (value): value is string => Boolean(value),
  );
  const paths = [payload.path, ...(payload.paths || [])].filter(
    (value): value is string => Boolean(value),
  );

  tags.forEach((tag) => revalidateTag(tag, "max"));
  paths.forEach((path) => revalidatePath(path));

  if (tags.length === 0 && paths.length === 0) {
    revalidatePath("/");
  }

  return NextResponse.json({
    ok: true,
    revalidatedTags: tags,
    revalidatedPaths: paths.length > 0 ? paths : ["/"],
  });
}
