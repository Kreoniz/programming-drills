import { createContext, useContext, useMemo, useState } from "react";
type Settings = { theme: "light" | "dark" };
const SettingsStateContext = createContext<Settings | null>(null);
const SettingsActionsContext = createContext<{ setTheme(theme: Settings["theme"]): void } | null>(null);
export function SettingsProvider(props: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ theme: "light" });
  const actions = useMemo(() => ({ setTheme: (theme: Settings["theme"]) => setSettings({ theme }) }), []);
  return (
    <SettingsActionsContext.Provider value={actions}>
      <SettingsStateContext.Provider value={settings}>{props.children}</SettingsStateContext.Provider>
    </SettingsActionsContext.Provider>
  );
}
export const useSettings = () => useContext(SettingsStateContext);
export const useSettingsActions = () => useContext(SettingsActionsContext);
