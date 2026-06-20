import { createContext, useContext, useState } from "react";

type TabsContextValue = { value: string; setValue(value: string): void };
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  // TODO: read context and throw outside Tabs.Root.
  return useContext(TabsContext);
}

export const Tabs = {
  Root(props: { defaultValue: string; children: React.ReactNode }) {
    const [value, setValue] = useState(props.defaultValue);
    return props.children;
  },
  List(props: { children: React.ReactNode }) { return <div role="tablist">{props.children}</div>; },
  Trigger(props: { value: string; children: React.ReactNode }) { return <button>{props.children}</button>; },
  Panel(props: { value: string; children: React.ReactNode }) { return <div>{props.children}</div>; },
};
