type Events = {
  "cart:updated": { count: number };
};

export function publish<K extends keyof Events>(name: K, payload: Events[K]) {
  window.dispatchEvent(new CustomEvent(String(name), { detail: payload }));
}

export function subscribe<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<Events[K]>).detail);
  window.addEventListener(String(name), listener);
  return () => window.removeEventListener(String(name), listener);
}
