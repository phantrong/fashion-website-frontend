import Axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { history } from '../App';
import configs from '../config';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    const token = Cookies.get('token');
    const customerId = localStorage.getItem('customer_id');
    if (!!token) {
      config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    }
    config.headers['Customer-id'] = customerId;

    return config;
  },
  (error) => Promise.reject(error)
);

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('refreshToken');
  history.push('/');
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error.response.status !== 401) {
      if (Cookies.get('token')) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export const sendGet = (url: string, params?: any, config?: AxiosRequestConfig) =>
  axiosInstance.get(url, { params, ...(config || {}) }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any, config?: AxiosRequestConfig) =>
  axiosInstance.post(url, params, { params: queryParams, ...(config || {}) }).then((res) => res.data);
export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) => axiosInstance.delete(url, { params }).then((res) => res.data);
