import { afterEach, describe, expect, it, vi } from "vitest";
import { getApiKey } from "./env";

describe("getApiKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the key when it is set", () => {
    vi.stubEnv("ORBITALWIKI_API_KEY", "ow_test_key");
    expect(getApiKey()).toBe("ow_test_key");
  });

  it("throws when the key is not set", () => {
    vi.stubEnv("ORBITALWIKI_API_KEY", undefined);
    expect(() => getApiKey()).toThrow("ORBITALWIKI_API_KEY is not set");
  });
});
