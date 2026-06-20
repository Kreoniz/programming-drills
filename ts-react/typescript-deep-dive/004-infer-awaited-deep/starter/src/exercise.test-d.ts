      import type { AwaitedDeep } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type _nested = Assert<Equal<AwaitedDeep<Promise<Promise<{ id: string }>>>, { id: string }>>;
      type _plain = Assert<Equal<AwaitedDeep<number>, number>>;
