import "server-only";

export const ORBITALWIKI_BASE_URL =
  process.env.ORBITALWIKI_BASE_URL ?? "https://www.orbitalwiki.com/api/v1";

export function getApiKey(): string {
  const key = process.env.ORBITALWIKI_API_KEY;
  if (!key) {
    throw new Error("ORBITALWIKI_API_KEY is not set. Copy .env.example to .env.local.");
  }
  return key;
}
