export type ReadonlyExcept<T, K extends keyof T> =
  Readonly<Omit<T, K>> & { -readonly [P in K]: T[P] };
