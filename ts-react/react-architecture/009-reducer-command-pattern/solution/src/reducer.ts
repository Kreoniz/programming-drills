type State = { saved: boolean };
type Action = { type: "saved"; id: string };
type Command = { type: "navigate"; to: string } | { type: "none" };

export function reducer(state: State, action: Action): { state: State; command: Command } {
  switch (action.type) {
    case "saved":
      return { state: { saved: true }, command: { type: "navigate", to: "/projects/" + action.id } };
    default:
      return { state, command: { type: "none" } };
  }
}
