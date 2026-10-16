import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { z } from "zod";

const ALLOWED_TAGS = ["routes", "events", "clubs", "cities", "stats", "testimonials"] as const;

const bodySchema = z.object({ tags: z.array(z.enum(ALLOWED_TAGS)).min(1) });

/**
 * On-demand revalidation. The backend / mobile admin calls this when content changes:
 *   POST /api/revalidate
 *   Headers: x-revalidate-secret: <REVALIDATE_SECRET>
 *   Body:    { "tags": ["events"] }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid body", allowed: ALLOWED_TAGS }, { status: 400 });
  }
  for (const tag of parsed.data.tags) revalidateTag(tag, "max");
  return Response.json({ revalidated: parsed.data.tags });
}
