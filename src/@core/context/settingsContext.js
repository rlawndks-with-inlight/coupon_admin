// ** React Imports
import { createContext, useState, useEffect } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'
import { getLocalStorage, setLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { axiosIns } from 'src/@fake-db/backend'


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
  dnsData: themeConfig.dnsData
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
    setSettings(obj)
  }, [pageSettings])
  useEffect(() => {
    getDnsData();
    //getMchtData();
  }, [])
  useEffect(() => {
  }, [settings])
  const getDnsData = async () => {
    let dnsData = {};
    let mchts = [];
    let coupon_models = [];
    try {
      const response = await axiosIns().get(`/api/v1/auth/domain?dns=${window.location.hostname}`);
      dnsData = { ...response?.data };
      setLocalStorage(LOCALSTORAGE.DNS_DATA, JSON.stringify(dnsData));
    } catch (err) {
      console.log(err);
    }
    setSettings({ ...settings, dnsData });
    try {
      let user = getLocalStorage(LOCALSTORAGE.USER_DATA);
      user = JSON.parse(user);
      if (user?.level > 0) {
        mchts = await axiosIns().get(`/api/v1/manager/merchandises?page=1&page_size=100000`);
        mchts = mchts?.data?.content ?? [];
        mchts = mchts.sort((a, b) => {
          if (a.mcht_name > b.mcht_name) return 1;
          if (a.mcht_name < b.mcht_name) return -1;
          return 0;
        });
        coupon_models = await axiosIns().get(`/api/v1/manager/coupon-models?page=1&page_size=100000`);
        coupon_models = coupon_models?.data?.content ?? [];
        coupon_models = coupon_models.sort((a, b) => {
          if (a.coupon_name > b.coupon_name) return 1;
          if (a.coupon_name < b.coupon_name) return -1;
          return 0;
        });
      } else {

      }
    } catch (err) {

    }
    setSettings({ ...settings, dnsData, mchts, coupon_models });
  }
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
