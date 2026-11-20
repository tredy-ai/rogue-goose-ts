// PART 1 — implement without AI assistance. See README.md.
import type { SearchFailure } from "@/lib/view-types";

export async function POST(_request: Request): Promise<Response> {
  const body: SearchFailure = { error: { message: "Not implemented" } };
  return Response.json(body, { status: 501 });
}
