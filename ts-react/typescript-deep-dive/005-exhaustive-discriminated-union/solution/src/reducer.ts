export type State = { count: number };
export type Action =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };

export function assertNever(value: never): never {
  throw new Error("Unexpected action: " + JSON.stringify(value));
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.by };
    case "decrement":
      return { count: state.count - action.by };
    case "reset":
      return { count: 0 };
    default:
      return assertNever(action);
  }
}
