import { useDeferredValue, useMemo, useState } from "react";

export function SearchResults(props: { items: string[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  const visible = useMemo(() => props.items.filter(item => item.includes(deferredQuery)), [props.items, deferredQuery]);
  return <>
    <input value={query} onChange={event => setQuery(event.currentTarget.value)} />
    <ul aria-busy={isStale}>{visible.map(item => <li key={item}>{item}</li>)}</ul>
  </>;
}
