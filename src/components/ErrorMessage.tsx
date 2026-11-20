import type { SearchFailure } from "@/lib/view-types";

export function ErrorMessage({ error }: { error: SearchFailure["error"] }) {
  return (
    <p role="alert" style={{ color: "red" }}>
      {error.message}
      {error.field && ` (field: ${error.field})`}
    </p>
  );
}
