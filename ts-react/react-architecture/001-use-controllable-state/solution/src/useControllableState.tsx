import { useCallback, useState } from "react";

export function useControllableState<T>(options: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const isControlled = options.value !== undefined;
  const [internalValue, setInternalValue] = useState(options.defaultValue);
  const currentValue = isControlled ? options.value as T : internalValue;
  const setValue = useCallback((next: T) => {
    if (!isControlled) setInternalValue(next);
    options.onChange?.(next);
  }, [isControlled, options.onChange]);
  return [currentValue, setValue];
}
