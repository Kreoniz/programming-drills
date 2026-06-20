export function createFilteredSelector() {
  let lastItems: string[] | null = null;
  let lastQuery = "";
  let lastResult: string[] = [];
  return (items: string[], query: string) => {
    if (items === lastItems && query === lastQuery) return lastResult;
    lastItems = items;
    lastQuery = query;
    lastResult = items.filter(item => item.includes(query));
    return lastResult;
  };
}
