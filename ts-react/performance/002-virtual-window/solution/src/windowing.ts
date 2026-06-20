export function getVisibleRange(input: { scrollTop: number; viewportHeight: number; rowHeight: number; count: number; overscan: number }) {
  const firstVisible = Math.floor(input.scrollTop / input.rowHeight);
  const visibleCount = Math.ceil(input.viewportHeight / input.rowHeight);
  const start = Math.max(0, firstVisible - input.overscan);
  const end = Math.min(input.count, firstVisible + visibleCount + input.overscan);
  return { start, end };
}
