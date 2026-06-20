import type { DeepReadonly } from "./exercise";

type State = { user: { name: string; roles: string[] }; save(): void };
declare const state: DeepReadonly<State>;
state.save();
// @ts-expect-error nested object is readonly
state.user.name = "Ada";
// @ts-expect-error nested array is readonly
state.user.roles.push("admin");
