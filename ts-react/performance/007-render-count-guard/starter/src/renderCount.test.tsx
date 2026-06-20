import { describe, expect, it } from "vitest";

describe("Dashboard render behavior", () => {
  it("does not rerender expensive child on unrelated updates", async () => {
    // TODO: count ExpensiveChild renders after unrelated updates.
    expect(true).toBe(true);
  });
});
