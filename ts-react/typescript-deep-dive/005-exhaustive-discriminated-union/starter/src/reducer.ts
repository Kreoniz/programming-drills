export type State = { count: number };
export type Action =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };

export function assertNever(value: never): never {
  throw new Error("Unexpected action: " + JSON.stringify(value));
}

export function reducer(state: State, action: Action): State {
  // TODO: handle every action and call assertNever in the default branch.
  if (action.type === "increment") return { count: state.count + action.by };
  return state;
}
