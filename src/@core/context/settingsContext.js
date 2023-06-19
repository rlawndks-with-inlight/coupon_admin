// ** React Imports
import { createContext, useState, useEffect } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'
import { getLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'


const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  skin: themeConfig.skin,
  footer: themeConfig.footer,
  layout: themeConfig.layout,
  lastLayout: themeConfig.layout,
  direction: themeConfig.direction,
  navHidden: themeConfig.navHidden,
  appBarBlur: themeConfig.appBarBlur,
  navCollapsed: themeConfig.navCollapsed,
  contentWidth: themeConfig.contentWidth,
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType,
  appBar: themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden' ? 'fixed' : themeConfig.appBar,
}

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  layout: initialSettings.layout,
  navHidden: initialSettings.navHidden,
  lastLayout: initialSettings.lastLayout,
  toastPosition: initialSettings.toastPosition
}

const restoreSettings = () => {
  let settings = null
  try {
    const storedData = window.localStorage.getItem('settings')
    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings }
    } else {
      settings = initialSettings
    }
  } catch (err) {
    console.error(err)
  }

  return settings
}

// set settings in localStorage
const storeSettings = settings => {
  const initSettings = Object.assign({}, settings)
  delete initSettings.appBar
  delete initSettings.footer
  delete initSettings.layout
  delete initSettings.navHidden
  delete initSettings.lastLayout
  delete initSettings.toastPosition
  window.localStorage.setItem('settings', JSON.stringify(initSettings))
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children, pageSettings }) => {
  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })
  useEffect(() => {
    const restoredSettings = restoreSettings()
    let obj = {};
    if (restoredSettings) {
      obj = { ...restoredSettings }
    }
    if (pageSettings) {
      obj = { ...settings, ...pageSettings }
    }
    obj['dnsData'] = JSON.parse(getLocalStorage(LOCALSTORAGE.DNS_DATA));
    if (typeof obj['dnsData']?.theme_css == 'string') {
      obj['dnsData'].theme_css = JSON.parse(obj['dnsData'].theme_css)
    }
    if (typeof obj['dnsData']?.options == 'string') {
      obj['dnsData'].options = JSON.parse(obj['dnsData'].options)
    }
    setSettings(obj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings])
  useEffect(() => {
    if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
      saveSettings({ ...settings, mode: 'light' })
    }
    if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
      saveSettings({ ...settings, appBar: 'fixed' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout])

  const saveSettings = updatedSettings => {
    storeSettings(updatedSettings)
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
