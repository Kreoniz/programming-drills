import { lazy, Suspense } from "react";

const ReportsPage = lazy(() => import("./ReportsPage"));

export function ReportsRoute() {
  return (
    <Suspense fallback={<div role="status">Loading reports</div>}>
      <ReportsPage />
    </Suspense>
  );
}
