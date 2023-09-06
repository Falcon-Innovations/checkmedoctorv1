import Axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../utils/storage';
import { BASE_URL } from '../utils/config';
import { Alert } from 'react-native';

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await getToken();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    Alert.alert(message);
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    return Promise.reject(error);
  }
);
