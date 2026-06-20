import { createContext, useContext, useMemo, useState } from "react";

type TabsContextValue = { value: string; setValue(value: string): void };
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside Tabs.Root");
  return context;
}

export const Tabs = {
  Root(props: { defaultValue: string; children: React.ReactNode }) {
    const [value, setValue] = useState(props.defaultValue);
    const contextValue = useMemo(() => ({ value, setValue }), [value]);
    return <TabsContext.Provider value={contextValue}>{props.children}</TabsContext.Provider>;
  },
  List(props: { children: React.ReactNode }) { return <div role="tablist">{props.children}</div>; },
  Trigger(props: { value: string; children: React.ReactNode }) {
    const { value, setValue } = useTabsContext();
    return <button role="tab" aria-selected={value === props.value} onClick={() => setValue(props.value)}>{props.children}</button>;
  },
  Panel(props: { value: string; children: React.ReactNode }) {
    const { value } = useTabsContext();
    return value === props.value ? <div role="tabpanel">{props.children}</div> : null;
  },
};
