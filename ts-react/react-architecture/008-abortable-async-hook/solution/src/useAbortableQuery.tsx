import { useEffect, useState } from "react";

export function useAbortableQuery<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    load(controller.signal).then(
      value => { if (!controller.signal.aborted) setData(value); },
      reason => { if (!controller.signal.aborted) setError(reason); },
    );
    return () => controller.abort();
  }, [key, load]);
  return { data, error };
}
