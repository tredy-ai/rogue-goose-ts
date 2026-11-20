"use client";

import { useSearch } from "@/hooks/useSearch";
import { SearchForm } from "./SearchForm";

export function SearchPage() {
  const search = useSearch();

  return (
    <main className="p-4 flex flex-col items-center">
      <h1>Satellite search</h1>
      <SearchForm onSubmit={(data) => search.mutate(data)} pending={false /* TODO(Part 1) */} />

      {/* TODO(Part 1): render loading, error (ErrorMessage) and results (ResultsTable) from `search`. */}

      <footer className="pt-16 flex flex-col items-center whitespace-pre-line">
        <p>Satellite data from OrbitalWiki (ODbL-1.0) and its upstream sources:</p>
				<ul className="flex flex-col list-disc">
					<li>CelesTrak</li>
					<li>GCAT (Jonathan McDowell, CC BY 4.0)</li>
					<li>Wikidata (CC0)</li>
					<li>SatNOGS (CC BY-SA 4.0)</li>
				</ul>
				<p className="pt-4">Approximate; not for operational use.</p>
      </footer>
    </main>
  );
}
