import type { NextRequest } from "next/server";
import { nearbyQuerySchema } from "@/features/riders/schemas";
import { ridersService } from "@/features/riders/services";

/** BFF endpoint used by the "Riders near you" client component. */
export async function GET(request: NextRequest) {
  const parsed = nearbyQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return Response.json({ error: "Invalid query", issues: parsed.error.issues }, { status: 400 });
  }
  try {
    const data = await ridersService.getNearby(parsed.data);
    return Response.json({ data }, { headers: { "Cache-Control": "private, max-age=60" } });
  } catch {
    return Response.json({ error: "Upstream error" }, { status: 502 });
  }
}
