import { makeUserId } from "./exercise";
import type { UserId } from "./exercise";

const id = makeUserId("user_1");
const asString: string = id;
const acceptsUserId = (value: UserId) => value;
acceptsUserId(id);
// @ts-expect-error plain strings are not UserId values
acceptsUserId("user_2");
void asString;
