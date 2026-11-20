"use client";

import { useSearch } from "@/hooks/useSearch";
import { SearchForm } from "./SearchForm";

export function SearchPage() {
  const search = useSearch();

  return (
    <main>
      <h1>Satellite search</h1>
      <SearchForm onSubmit={(data) => search.mutate(data)} pending={false /* TODO(Part 1) */} />

      {/* TODO(Part 1): render loading, error (ErrorMessage) and results (ResultsTable) from `search`. */}

      <footer>
        Satellite data from OrbitalWiki (ODbL-1.0) and its upstream sources: CelesTrak, GCAT
        (Jonathan McDowell, CC BY 4.0), Wikidata (CC0) and SatNOGS (CC BY-SA 4.0). Approximate; not
        for operational use.
      </footer>
    </main>
  );
}
