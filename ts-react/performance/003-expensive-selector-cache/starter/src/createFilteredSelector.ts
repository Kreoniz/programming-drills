export function createFilteredSelector() {
  // TODO: cache by items identity and query.
  return (items: string[], query: string) => items.filter(item => item.includes(query));
}
