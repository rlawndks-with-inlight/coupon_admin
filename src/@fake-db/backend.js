import axios from 'axios';
import { getCookie } from 'src/@core/utils/react-cookie';


const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    "Authorization": `Bearer ${getCookie('o')}`,
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
  withCredentials: true
})

export default axiosIns;
