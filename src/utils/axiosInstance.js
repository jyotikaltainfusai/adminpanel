import axios from 'axios';
import { backendUrl } from '../config/Config';

let headers = {};
var token = '';

const gettoken = () => {
  var mytoken = sessionStorage.getItem('token')
  if (mytoken) {
    mytoken = JSON.parse(mytoken);
    token = mytoken;
    return token;
  }
  return;
}

gettoken();

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      // navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;