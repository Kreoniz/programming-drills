import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SettingsDialog } from "./SettingsDialog";

describe("SettingsDialog", () => {
  it("supports keyboard open and close", async () => {
    const user = userEvent.setup();
    render(<SettingsDialog />);
    const trigger = screen.getByRole("button", { name: /settings/i });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: /settings/i });
    expect(dialog).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
  });
});
