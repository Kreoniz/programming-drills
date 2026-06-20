      import type { CamelizeKeys, SnakeToCamel } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type _name = Assert<Equal<SnakeToCamel<"user_profile_id">, "userProfileId">>;
      type _object = Assert<Equal<CamelizeKeys<{ user_id: string; created_at: number }>, { userId: string; createdAt: number }>>;
