declare module "reports/Widget" {
  import type { ComponentType } from "react";
  const Widget: ComponentType<{ accountId: string; onRefresh?: () => void }>;
  export default Widget;
}
