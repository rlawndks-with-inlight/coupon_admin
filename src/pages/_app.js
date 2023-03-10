// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider, useTheme } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import

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
import { useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { backUrl, LOCALSTORAGE } from 'src/data/data'
import HeadContent from 'src/@core/components/head'
import { returnMoment } from 'src/@core/utils/function'
import axios from 'axios'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Html } from 'next/document'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})


// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, dns_data } = props
  const saveDnsData = () => {
    setLocalStorage(LOCALSTORAGE.DNS_DATA, JSON.stringify(dns_data));
  }
  useEffect(() => {
    saveDnsData();
  }, [dns_data])

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <HeadContent dns_data={dns_data} />
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
  )
}
App.getInitialProps = async ({ Component, ctx }) => {
  try {
    if (!ctx.req) {
      return {
        dns_data: {}
      }
    }
    const res = await axios.get(`${backUrl}/api/v1/auth/domain?dns=${ctx.req.headers.host.split(':')[0]}`);
    const json = await res.data;
    return {
      dns_data: json
    }
  } catch (err) {
    console.log(err)
    return {
      dns_data: {}
    }
  }
}
export default App
