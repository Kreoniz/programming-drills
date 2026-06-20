import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger";
type ButtonOwnProps<C extends ElementType> = {
  as?: C;
  variant?: Variant;
  children: ReactNode;
};
export type ButtonProps<C extends ElementType> =
  ButtonOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>;
export function Button<C extends ElementType = "button">({ as, variant = "primary", children, ...rest }: ButtonProps<C>) {
  const Component = as ?? "button";
  return <Component data-variant={variant} {...rest}>{children}</Component>;
}
