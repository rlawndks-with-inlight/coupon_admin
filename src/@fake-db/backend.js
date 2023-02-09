import axios from 'axios';
import { getDomain } from 'src/@core/utils/function';
import { getCookie } from 'src/@core/utils/react-cookie';
import dynamic from 'next/dynamic'

export const axiosIns = () => {
  let dns_info = {
    // You can add your headers here
    // ================================
    baseURL: window.location.protocol + "//" + window.location.host,
    timeout: 10000,
    headers: {
      "Authorization": `Bearer ${getCookie('o')}`,
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    withCredentials: true
  }

  const axiosIns = axios.create(dns_info)

  return axiosIns;
}

