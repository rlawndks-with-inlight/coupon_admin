import axios from 'axios';
import { useRouter } from 'next/router';
import { getDomain } from 'src/@core/utils/function';
import { getCookie } from 'src/@core/utils/react-cookie';

let dns_info = {
  // You can add your headers here
  // ================================
  baseURL: decodeURI(`${getCookie('d')}`),
  timeout: 10000,
  headers: {
    "Authorization": `Bearer ${getCookie('o')}`,
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
  withCredentials: true
}

const axiosIns = axios.create(dns_info)

export default axiosIns;
