// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

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
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined



  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`comagain`}</title>
          <meta
            name='description'
            content={`comagain`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="{{ $name }}" />
          <meta property="og:image" content="{{ $favicon_img }}" />
          <meta property="og:description" content="모두가 간편한 서비스 {{ $name }}" />
          <meta name="author" content="purplevery" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="{{ $name }}" />
          <meta name="theme-color" content="{{ $bk_clr }}" />
          <link rel="apple-touch-icon" sizes="180x180" href="{{ $favicon_img }}" />
          <link rel="shortcut icon" href="{{ $favicon_img }}" type="image/x-icon" />
        </Head>

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

export default App
