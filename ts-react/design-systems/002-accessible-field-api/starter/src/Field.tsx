export function Field(props: { label: string; description?: string; error?: string; children: React.ReactElement }) {
  // TODO: wire label, description, and error to the child input.
  return <label>{props.label}{props.children}</label>;
}
