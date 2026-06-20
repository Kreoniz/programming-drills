import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBox } from "./SearchBox";

describe("SearchBox", () => {
  it("commits after the debounce", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<SearchBox debounceMs={300} />);
    await user.type(screen.getByRole("searchbox"), "react");
    await vi.advanceTimersByTimeAsync(300);
    expect(screen.getByText("react")).toBeInTheDocument();
    vi.useRealTimers();
  });
});
