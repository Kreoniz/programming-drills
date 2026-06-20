import { useState } from "react";

export function Dashboard() {
  const [query, setQuery] = useState("");
  // TODO: move transient input state into SearchBox.
  return <SearchBox value={query} onChange={setQuery} />;
}

function SearchBox(props: { value: string; onChange(value: string): void }) {
  return <input value={props.value} onChange={event => props.onChange(event.currentTarget.value)} />;
}
