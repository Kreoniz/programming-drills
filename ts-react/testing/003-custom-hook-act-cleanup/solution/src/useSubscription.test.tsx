import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSubscription } from "./useSubscription";

describe("useSubscription", () => {
  it("cleans up subscriptions", () => {
    const unsubscribe = vi.fn();
    const subscribe = vi.fn(() => unsubscribe);
    const { result, unmount } = renderHook(() => useSubscription(subscribe));
    act(() => result.current.refresh());
    unmount();
    expect(subscribe).toHaveBeenCalled();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
