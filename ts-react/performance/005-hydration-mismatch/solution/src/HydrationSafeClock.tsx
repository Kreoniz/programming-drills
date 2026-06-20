import { useEffect, useState } from "react";

export function HydrationSafeClock() {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);
  return <time>{timestamp === null ? "pending" : timestamp}</time>;
}
