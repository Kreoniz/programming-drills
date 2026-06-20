import { useEffect, useState } from "react";

export function useAbortableQuery<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  // TODO: create AbortController per key and abort stale requests.
  useEffect(() => {
    load(new AbortController().signal).then(setData, setError);
  }, [key, load]);
  return { data, error };
}
