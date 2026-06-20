export type AwaitedDeep<T> =
  T extends PromiseLike<infer Inner> ? AwaitedDeep<Inner> : T;
