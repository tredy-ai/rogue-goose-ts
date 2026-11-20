import { describe, expect, it } from "vitest";
import { POST } from "./route";

// Example of calling the route handler directly. Replace this test once you implement the handler.
describe("POST /api/search", () => {
  it("returns 501 until implemented", async () => {
    const form = new FormData();
    form.set("missionStatus", "Operational");

    const res = await POST(
      new Request("http://localhost/api/search", { method: "POST", body: form }),
    );

    expect(res.status).toBe(501);
  });
});
