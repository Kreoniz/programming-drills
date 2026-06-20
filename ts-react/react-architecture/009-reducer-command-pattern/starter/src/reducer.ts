type State = { saved: boolean };
type Action = { type: "saved"; id: string };

export function reducer(state: State, action: Action) {
  // TODO: return state plus a command instead of doing side effects here.
  window.location.href = "/projects/" + action.id;
  return { saved: true };
}
