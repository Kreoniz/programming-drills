export async function loadRemoteWidget() {
  // TODO: import the remote and return a fallback component on failure.
  return import("reports/Widget");
}
