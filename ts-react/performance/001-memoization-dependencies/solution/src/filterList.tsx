import { useMemo } from "react";
export function FilteredList(props: { items: string[]; query: string; limit: number }) {
  const visible = useMemo(
    () => props.items.filter(item => item.includes(props.query)).slice(0, props.limit),
    [props.items, props.query, props.limit],
  );
  return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>;
}
