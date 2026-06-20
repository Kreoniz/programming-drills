export type SnakeToCamel<S extends string> =
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
    : S;

export type CamelizeKeys<T> = {
  [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K]
};
