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

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import fetch from 'isomorphic-unfetch';
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
import { setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

import Script from 'next/script'
import { returnMoment } from 'src/@core/utils/function'
import Head from 'next/head'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'

const clientSideEmotionCache = createEmotionCache()


// ** Configure JSS & ClassName
const App = props => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps, dns_data } = props

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  const saveDnsData = () => {
    setLocalStorage(LOCALSTORAGE.DNS_DATA, JSON.stringify(dns_data));
  }
  useEffect(() => {
    saveDnsData();
    getDnsData(dns_data);
  }, [])
  const [dnsData, setDnsData] = useState({});

  const getDnsData = async (dns_data_) => {
    try {
      if (!dns_data_) {
        let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
        dns_data = JSON.parse(dns_data);
        if (!dns_data?.name) {
          const response = await axiosIns().get(`/api/v1/auth/domain?dns=${location.hostname}`);
          setDnsData(response?.data);
        } else {
          setDnsData(dns_data);
        }
      } else {
        setDnsData(dns_data_)
      }
    } catch (err) {
      console.log(err);
    }
  }
  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined;

  return (
    <>
      {isLoading ? <FallbackSpinner color={'#ccc'} /> : ''}
      <Head>
        <title>{`${(dns_data?.name || dnsData?.name) ?? ""}`}</title>
        <meta
          name='description'
          content={(dns_data?.og_description || dnsData?.og_description) ?? ""}
        />
        <link rel='shortcut icon' href={(dns_data?.favicon_img || dnsData?.favicon_img) ?? ""} />
        <link rel="apple-touch-icon" sizes="180x180" href={(dns_data?.favicon_img || dnsData?.favicon_img) ?? ""} />
        <meta name='keywords' content={(dns_data?.name || dnsData?.name)} />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={(dns_data?.name || dnsData?.name) ?? ""} />
        <meta property="og:image" content={(dns_data?.og_img || dnsData?.og_img) ?? ""} />
        <meta property="og:url" content={'https:' + (dns_data?.dns || dnsData?.dns) ?? ""} />
        <meta property="og:description" content={(dns_data?.og_description || dnsData?.og_description) ?? ""} />
        <meta name="author" content="purplevery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={(dns_data?.name || dnsData?.name) ?? ""} />
        <meta name="theme-color" content={JSON.parse(dns_data?.theme_css ?? "{}")?.main_color || "#7367f0"} />
      </Head>
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
App.getInitialProps = async ({ Component, ctx }) => {
  try {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    if (ctx.req?.headers) {
      const host = ctx.req.headers.host.split(':')[0];
      const res = await fetch(`${process.env.BACK_URL}/api/v1/auth/domain?dns=${host}`);
      const json = (await res.json());
      return {
        dns_data: json
      }
    } else {
      return {
        dns_data: {}
      }
    }
  } catch (err) {
    return {
      dns_data: {}
    }
  }
}
export default App
