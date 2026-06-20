import { useMemo, useState } from "react";

export function SearchResults(props: { items: string[] }) {
  const [query, setQuery] = useState("");
  // TODO: filter with a deferred query.
  const visible = useMemo(() => props.items.filter(item => item.includes(query)), [props.items, query]);
  return <>
    <input value={query} onChange={event => setQuery(event.currentTarget.value)} />
    <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
  </>;
}
