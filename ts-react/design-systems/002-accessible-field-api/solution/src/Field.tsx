import { cloneElement, useId } from "react";

export function Field(props: { label: string; description?: string; error?: string; children: React.ReactElement }) {
  const id = useId();
  const descriptionId = props.description ? `${id}-description` : undefined;
  const errorId = props.error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id}>{props.label}</label>
      {cloneElement(props.children, { id, "aria-describedby": describedBy, "aria-invalid": Boolean(props.error) })}
      {props.description && <p id={descriptionId}>{props.description}</p>}
      {props.error && <p id={errorId} role="alert">{props.error}</p>}
    </div>
  );
}
