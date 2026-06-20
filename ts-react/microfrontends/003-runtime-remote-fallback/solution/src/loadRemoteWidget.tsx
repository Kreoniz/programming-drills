import type { ComponentType } from "react";

type WidgetModule = { default: ComponentType<{ accountId: string }> };
const FallbackWidget: ComponentType<{ accountId: string }> = () => <section role="status">Reports unavailable</section>;

export async function loadRemoteWidget(): Promise<WidgetModule> {
  try {
    return await import("reports/Widget") as WidgetModule;
  } catch {
    return { default: FallbackWidget };
  }
}
