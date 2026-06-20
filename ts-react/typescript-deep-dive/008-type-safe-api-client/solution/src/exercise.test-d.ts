      import type { Client } from "./exercise";
      export type Equal<X, Y> = (
  <T>() => T extends X ? 1 : 2
) extends (
  <T>() => T extends Y ? 1 : 2
) ? true : false;

export type Assert<T extends true> = T;


      type Endpoints = {
        getUser: { request: { id: string }; response: { name: string } };
        search: { request: { q: string }; response: { ids: string[] } };
      };

      declare const client: Client<Endpoints>;
      const user = client.request("getUser", { id: "1" });
      type _user = Assert<Equal<typeof user, Promise<{ name: string }>>>;
      // @ts-expect-error request shape must match endpoint
      client.request("getUser", { q: "Ada" });
