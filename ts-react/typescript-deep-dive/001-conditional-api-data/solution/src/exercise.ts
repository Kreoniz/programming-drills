export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { message: string } };

export type DataOf<T> = T extends { ok: true; data: infer Data } ? Data : never;
