export type Brand<T, Name extends string> = T & { readonly __brand: Name };
export type UserId = Brand<string, "UserId">;

export function makeUserId(value: string): UserId {
  return value as UserId;
}
