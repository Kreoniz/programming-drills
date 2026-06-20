import { useSyncExternalStore } from "react";

let count = 0;
const listeners = new Set<() => void>();

export const counterStore = {
  getSnapshot: () => count,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  increment() {
    count += 1;
    listeners.forEach(listener => listener());
  },
};

export function useCounterStore() {
  return useSyncExternalStore(counterStore.subscribe, counterStore.getSnapshot, counterStore.getSnapshot);
}
