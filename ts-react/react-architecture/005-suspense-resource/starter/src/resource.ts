export function createResource<T>(load: () => Promise<T>) {
  // TODO: track pending, success, and error states.
  const promise = load();
  return {
    read(): T {
      throw promise;
    },
  };
}
