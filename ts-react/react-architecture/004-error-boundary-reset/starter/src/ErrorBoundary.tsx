import { Component, ReactNode } from "react";

type Props = { resetKey: string; fallback(error: Error): ReactNode; children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  // TODO: capture errors and reset when resetKey changes.
  render() {
    return this.props.children;
  }
}
