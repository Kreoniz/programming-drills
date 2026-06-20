import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TodoList } from "./TodoList";

describe("TodoList optimistic create", () => {
  it("rolls back failed creates", async () => {
    const createTodo = vi.fn().mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<TodoList createTodo={createTodo} />);
    await user.type(screen.getByRole("textbox", { name: /todo/i }), "Ship it");
    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Ship it")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Ship it"));
    expect(screen.getByRole("alert")).toHaveTextContent("network");
  });
});
