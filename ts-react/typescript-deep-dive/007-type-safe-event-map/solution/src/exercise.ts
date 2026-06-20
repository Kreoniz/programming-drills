export interface TypedEmitter<M> {
  on<K extends keyof M>(event: K, handler: (payload: M[K]) => void): void;
  emit<K extends keyof M>(event: K, payload: M[K]): void;
}
