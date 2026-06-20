import { useMemo } from "react";
export function FilteredList(props: { items: string[]; query: string; limit: number }) {
  const options = { query: props.query, limit: props.limit };
  // TODO: remove object dependency churn.
  const visible = useMemo(() => props.items.filter(item => item.includes(options.query)).slice(0, options.limit), [props.items, options]);
  return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>;
}
