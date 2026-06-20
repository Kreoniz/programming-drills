export type Zip<A extends readonly unknown[], B extends readonly unknown[]> =
  A extends readonly [infer AH, ...infer AT]
    ? B extends readonly [infer BH, ...infer BT]
      ? [[AH, BH], ...Zip<AT, BT>]
      : []
    : [];
