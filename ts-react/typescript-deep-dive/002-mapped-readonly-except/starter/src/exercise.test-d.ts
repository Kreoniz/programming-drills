import type { ReadonlyExcept } from "./exercise";

type User = { id: string; name: string; role: string };
declare const user: ReadonlyExcept<User, "name">;

user.name = "Grace";
// @ts-expect-error id must be readonly
user.id = "next";
// @ts-expect-error role must be readonly
user.role = "admin";
