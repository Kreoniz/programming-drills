import { useState } from "react";

export function Dashboard() {
  const [query, setQuery] = useState("");
  return <SearchBox initialValue={query} onCommit={setQuery} />;
}

function SearchBox(props: { initialValue: string; onCommit(value: string): void }) {
  const [draft, setDraft] = useState(props.initialValue);
  return (
    <form onSubmit={event => { event.preventDefault(); props.onCommit(draft); }}>
      <input value={draft} onChange={event => setDraft(event.currentTarget.value)} />
    </form>
  );
}
