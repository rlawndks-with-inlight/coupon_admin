// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'
// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import fetch from 'isomorphic-unfetch';
// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

import Script from 'next/script'
import Head from 'next/head'
import { axiosIns } from 'src/@fake-db/backend'
import { useSettings } from 'src/@core/hooks/useSettings'
import HeadContent from 'src/@core/components/head'
const clientSideEmotionCache = createEmotionCache()

// ** Configure JSS & ClassName
const App = props => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps, dns_data } = props
  const [dnsData, setDnsData] = useState({});

  useEffect(() => {
    setDnsData(dns_data);
    setLocalStorage(LOCALSTORAGE.DNS_DATA, JSON.stringify(dns_data));
  }, [])
  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined;
  return (
    <>
      <HeadContent dns_data={dns_data?.name ? dns_data : dnsData} />
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Script
            strategy="beforeInteractive"
            src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_CLIENT_ID}`}
          ></Script>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      {getLayout(<Component {...pageProps} />)}
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </Provider>
    </>
  )
}


App.getInitialProps = async ({ ctx }) => {
  let dns_data = {};
  try {
    const host = ctx.req ? ctx.req.headers.host.split(':')[0] : '';
    const url = `${process.env.BACK_URL}/api/v1/auth/domain?dns=${host}`;
    const res = await fetch(url);
    dns_data = await res.json();
    return {
      dns_data,
    };
  } catch (err) {
    console.log(err);
    return {
      dns_data,
    };
  }
};

export default App
