import type { SatelliteRow, SearchSuccess } from "@/lib/view-types";

const COLUMNS = [
  "noradId",
  "name",
  "cosparId",
  "orbit",
  "status",
  "countryCode",
  "operator",
  "launchDate",
  "matchedOn",
] as const satisfies readonly (keyof SatelliteRow)[];

type Props = {
  data: SearchSuccess;
  onSelect?: (noradId: number) => void;
};

export function ResultsTable({ data, onSelect }: Props) {
  return (
    <div>
      <p>{data.totalMatches} matches</p>
      {data.rows.length === 0 ? (
        <p>No results.</p>
      ) : (
        <table className="border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th key={column} className="border border-black">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.noradId} onClick={onSelect ? () => onSelect(row.noradId) : undefined}>
                {COLUMNS.map((column) => (
                  <td key={column} className="border border-black">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
