// ** React Imports
import { createContext, useState, ReactNode } from 'react'
import { ThemeColor, ContentWidth } from 'src/@core/layouts/types'
import themeConfig from 'src/configs/themeConfig'
import ProtectedRoutes from 'src/protected-route';
import { PaletteMode } from '@mui/material'

import ProtectedRoute from '/src/protected-route/protected-route';

// ** MUI Imports
// ** ThemeConfig Import
// ** Types Import

export type Settings = {
  mode: PaletteMode
  themeColor: ThemeColor
  contentWidth: ContentWidth
}

export type SettingsContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings })

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings)
  }

  return <ProtectedRoute>
    <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
    </ProtectedRoute>
}

export const SettingsConsumer = SettingsContext.Consumer
