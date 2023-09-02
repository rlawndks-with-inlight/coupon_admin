// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
// ** MUI Components

import { useTheme } from '@mui/material/styles'


import toast from 'react-hot-toast';


// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { axiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import { getCookie } from 'src/@core/utils/react-cookie'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE, zRedirectType } from 'src/data/data'
import Loading from 'src/@core/layouts/components/app/Loading'
import FallbackSpinner from 'src/@core/components/spinner';
import HeadContent from 'src/@core/components/head';
import { useSettings } from 'src/@core/hooks/useSettings';

const Index = ({ dns_data }) => {
  // ** State
  const { settings } = useSettings();
  const [values, setValues] = useState({
    id: '',
    password: '',
    showPassword: false,
    brand_id: 0
  })
  const [dnsData, setDnsData] = useState({})
  const [loading, setLoading] = useState(false);

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    setSettings();
  }, [])

  const setSettings = async () => {
    setLoading(true);
    await checkDns();

  }

  const checkDns = async () => {
    try {
      let dns_data = settings.dnsData
      for (var i = 0; i < zRedirectType.length; i++) {
        if (dns_data?.redirect_type == zRedirectType[i].val) {
          router.push(zRedirectType[i].uri);
          return;
        }
      }
      router.push('/manager');
    } catch (err) {
      //toast.error(err?.response?.data?.message || err?.message);
      if (err?.response?.status == 409) {
        router.push('/404');
      }
    }
  }

  return (
    <>
    </>
  )
}

Index.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Index
