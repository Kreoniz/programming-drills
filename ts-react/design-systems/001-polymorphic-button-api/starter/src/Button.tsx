import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = string; // TODO: restrict variants.
type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  variant?: Variant;
  children: ReactNode;
};
export type ButtonProps<C extends ElementType> = ButtonOwnProps<C>;
export function Button<C extends ElementType = "button">(props: ButtonProps<C>) {
  const Component = props.as ?? "button";
  return <Component>{props.children}</Component>;
}
