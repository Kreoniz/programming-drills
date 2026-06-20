      import type { ApiResult, DataOf } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type User = { id: string; name: string };
      type _data = Assert<Equal<DataOf<ApiResult<User>>, User>>;
      type _failure = Assert<Equal<DataOf<{ ok: false; error: { message: string } }>, never>>;
