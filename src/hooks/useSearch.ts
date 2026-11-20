"use client";

import { useMutation } from "@tanstack/react-query";
import type { SearchFailure, SearchSuccess } from "@/lib/view-types";

export class SearchRequestError extends Error {
  constructor(
    public readonly failure: SearchFailure["error"],
    public readonly status: number,
  ) {
    super(failure.message);
    this.name = "SearchRequestError";
  }
}

/**
 * PART 1 — implement without AI assistance. See README.md.
 *
 * Turn the response from POST /api/search into a SearchSuccess,
 * or throw a SearchRequestError.
 */
export async function parseSearchResponse(_res: Response): Promise<SearchSuccess> {
  // TODO(Part 1)
  throw new Error("parseSearchResponse is not implemented");
}

export function useSearch() {
  return useMutation<SearchSuccess, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch("/api/search", { method: "POST", body: formData });
      return parseSearchResponse(res);
    },
  });
}
