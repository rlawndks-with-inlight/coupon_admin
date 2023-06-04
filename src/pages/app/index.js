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
import { LOCALSTORAGE } from 'src/data/data'
import Loading from 'src/@core/layouts/components/app/Loading'


const Index = ({ dns_data }) => {
  // ** State
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
    settings();
  }, [])

  const settings = async () => {
    setLoading(true);
    await checkDns();
    await checkAuth();
    setLoading(false);
  }


  const checkDns = async () => {
    try {
      let obj = {};
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      obj = JSON.parse(dns_data);

      const response = await axiosIns().get(`/api/v1/auth/domain?dns=${location.hostname}`);
      obj = { ...response?.data };
      setDnsData(obj);
      setValues({ ...values, ['brand_id']: obj.id });

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
      if (err?.response?.status == 409) {
        router.push('/404');
      }
    }
  }
  const checkAuth = async () => {
    try {
      const { data: response_auth } = await axiosIns().post('/api/v1/auth/ok', {}, {
        headers: {
          "Authorization": `Bearer ${getCookie('o')}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      if (response_auth?.level > 0) {
        await setLocalStorage(LOCALSTORAGE.USER_DATA, response_auth);
        setTimeout(() => {
          router.push('/app/home');
        }, 1300);
      }
    } catch (err) {
      console.log(err)
      if (err?.response?.data?.code == 950) {
        setTimeout(() => {
          router.push('/app/login')
        }, 1300);
      }
    }
  }
  return (
    <>
      <Loading />
    </>
  )
}


Index.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Index
