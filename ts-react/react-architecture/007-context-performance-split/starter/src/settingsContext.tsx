import { createContext, useContext, useState } from "react";
type Settings = { theme: "light" | "dark" };
const SettingsContext = createContext<{ settings: Settings; setTheme(theme: Settings["theme"]): void } | null>(null);
export function SettingsProvider(props: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ theme: "light" });
  // TODO: split state and actions into separate contexts.
  return <SettingsContext.Provider value={{ settings, setTheme: theme => setSettings({ theme }) }}>{props.children}</SettingsContext.Provider>;
}
export const useSettings = () => useContext(SettingsContext);
