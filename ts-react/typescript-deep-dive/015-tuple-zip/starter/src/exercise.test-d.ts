      import type { Zip } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type _zip = Assert<Equal<Zip<[1, 2, 3], ["a", "b"]>, [[1, "a"], [2, "b"]]>>;
      type _empty = Assert<Equal<Zip<[], ["a"]>, []>>;
