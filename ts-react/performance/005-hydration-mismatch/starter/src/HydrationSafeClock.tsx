export function HydrationSafeClock() {
  // TODO: Date.now during render causes hydration mismatches.
  return <time>{Date.now()}</time>;
}
