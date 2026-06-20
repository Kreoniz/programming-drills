export type DotPaths<T> = {
  [K in keyof T & string]:
    T[K] extends Record<string, unknown>
      ? K | `${K}.${DotPaths<T[K]>}`
      : K
}[keyof T & string];
