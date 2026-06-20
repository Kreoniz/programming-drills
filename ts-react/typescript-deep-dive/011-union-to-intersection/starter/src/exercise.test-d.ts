      import type { UnionToIntersection } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type Input = { id: string } | { name: string } | { active: boolean };
      type _case = Assert<Equal<UnionToIntersection<Input>, { id: string } & { name: string } & { active: boolean }>>;
