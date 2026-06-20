import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RetryBoundary } from "./RetryBoundary";

describe("RetryBoundary", () => {
  it("recovers after retry", async () => {
    const user = userEvent.setup();
    render(<RetryBoundary />);
    expect(screen.getByRole("alert")).toHaveTextContent(/failed/i);
    await user.click(screen.getByRole("button", { name: /retry/i }));
    expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
  });
});
