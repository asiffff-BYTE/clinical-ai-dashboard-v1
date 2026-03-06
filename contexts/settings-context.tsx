"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

interface SettingsContextValue {
  alertsEnabled: boolean
  setAlertsEnabled: (enabled: boolean) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [alertsEnabled, setAlertsEnabledState] = useState(true)

  const setAlertsEnabled = useCallback((enabled: boolean) => {
    setAlertsEnabledState(enabled)
  }, [])

  return (
    <SettingsContext.Provider value={{ alertsEnabled, setAlertsEnabled }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return ctx
}
