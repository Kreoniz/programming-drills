export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { message: string } };

export type DataOf<T> = unknown; // TODO
