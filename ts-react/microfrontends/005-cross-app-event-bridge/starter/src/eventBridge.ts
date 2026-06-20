type Events = {
  "cart:updated": { count: number };
};

export function publish<K extends keyof Events>(name: K, payload: Events[K]) {
  // TODO: dispatch a CustomEvent.
}

export function subscribe<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void) {
  // TODO: add listener and return unsubscribe.
  return () => {};
}
