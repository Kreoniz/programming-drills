type Status = "pending" | "success" | "error";

export function createResource<T>(load: () => Promise<T>) {
  let status: Status = "pending";
  let value: T;
  let error: unknown;
  const promise = load().then(
    result => { status = "success"; value = result; },
    reason => { status = "error"; error = reason; },
  );
  return {
    read(): T {
      if (status === "pending") throw promise;
      if (status === "error") throw error;
      return value;
    },
  };
}
