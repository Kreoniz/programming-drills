import { useCallback, useState } from "react";

export function useControllableState<T>(options: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  // TODO: support controlled and uncontrolled modes.
  const [value, setValue] = useState(options.defaultValue);
  return [value, setValue];
}
