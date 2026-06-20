import { useState } from "react";

let count = 0;
const listeners = new Set<() => void>();

export const counterStore = {
  getSnapshot: () => count,
  subscribe(listener: () => void) {
    // TODO: register listener and return unsubscribe.
    return () => {};
  },
  increment() {
    count += 1;
  },
};

export function useCounterStore() {
  // TODO: use useSyncExternalStore.
  return useState(count)[0];
}
