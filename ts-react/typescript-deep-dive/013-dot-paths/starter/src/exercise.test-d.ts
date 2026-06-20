      import type { DotPaths } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type Paths = DotPaths<{ user: { profile: { name: string } }; enabled: boolean }>;
      type _paths = Assert<Equal<Paths, "user" | "user.profile" | "user.profile.name" | "enabled">>;
