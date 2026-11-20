import type { OrbitLabel, StatusLabel } from "./form-options";

/** One search result, shaped for display. */
export type SatelliteRow = {
  noradId: number;
  name: string;
  cosparId: string | null;
  /** Display label, e.g. "Low Earth (LEO)". */
  orbit: OrbitLabel | "Unknown";
  /** Display label, e.g. "Partially Operational". */
  status: StatusLabel;
  countryCode: string | null;
  operator: string | null;
  /** ISO date string as returned by the API, or null. */
  launchDate: string | null;
  /** Why the API matched this result. */
  matchedOn: string;
};

/** Body of a 2xx response from POST /api/search. */
export type SearchSuccess = {
  totalMatches: number;
  rows: SatelliteRow[];
};

/** Body of a non-2xx response from POST /api/search. */
export type SearchFailure = {
  error: {
    /** Human-readable; shown in the UI. */
    message: string;
    /** The form field at fault, when the problem is one specific input. */
    field?: string;
  };
};
