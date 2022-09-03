// import { AUTH, USER_INFO, } from '@/store/actionType';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { IStorage } from '.';
// import store from '../store';
// import Loading from '../components/Loading';
let loadinged: number | null = null;
const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_I_ENV === 'dev' ? '/api' : process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    'x-lang': 'cn',
    'x-session-platform-code': 'casino_plat'
  }
});
instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!loadinged) {
    // Loading.show();
    loadinged = 1;
  }
  return config;
});
// // Add a response interceptor
instance.interceptors.response.use((response) => {
  const {
    data: result
  }: any = response;
  if (loadinged) {
    // Loading.hiden();
    loadinged = null;
  }
  if (!result.success) {
    return Promise.reject(new Error(result.msg));
  }
  return result;
}, (error) => {
  const response = error.response
  if (loadinged) {
    // Loading.hiden();
    loadinged = null;
  }
  if (response.status === 401) {
    console.log('response.status', response.status)
  } else if (response.data?.msg) {
    console.log('response.data?.msg', response.data?.msg)
  }

  return Promise.reject(response);
});
export default instance;
