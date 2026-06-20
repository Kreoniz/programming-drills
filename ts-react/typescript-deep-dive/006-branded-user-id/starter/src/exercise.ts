export type Brand<T, Name extends string> = T; // TODO
export type UserId = string; // TODO

export function makeUserId(value: string): UserId {
  return value;
}
