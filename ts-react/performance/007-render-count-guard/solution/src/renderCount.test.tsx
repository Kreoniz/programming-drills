import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Dashboard } from "./Dashboard";

describe("Dashboard render behavior", () => {
  it("does not rerender expensive child on unrelated updates", async () => {
    let expensiveRenders = 0;
    const user = userEvent.setup();
    render(<Dashboard onExpensiveRender={() => { expensiveRenders += 1; }} />);
    await user.click(screen.getByRole("button", { name: /toggle sidebar/i }));
    await user.click(screen.getByRole("button", { name: /toggle sidebar/i }));
    expect(expensiveRenders).toBe(1);
  });
});
