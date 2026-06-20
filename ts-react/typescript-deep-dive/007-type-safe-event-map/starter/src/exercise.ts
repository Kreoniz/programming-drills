export interface TypedEmitter<M> {
  on(event: keyof M, handler: (payload: unknown) => void): void; // TODO
  emit(event: keyof M, payload: unknown): void; // TODO
}
