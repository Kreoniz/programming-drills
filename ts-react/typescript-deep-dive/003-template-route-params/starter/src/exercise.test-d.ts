      import type { RouteParams } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type Params = RouteParams<"/users/:userId/posts/:postId">;
      type _params = Assert<Equal<Params, { userId: string } & { postId: string }>>;
      type _none = Assert<Equal<RouteParams<"/health">, {}>>;
