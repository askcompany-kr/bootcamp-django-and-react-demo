import Axios from "axios";
import {API_HOST} from "./Constants";

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';

// axiosInstance.interceptors.response.use(
//   response => {
//     // Do something with response data
//     return response;
//   },
//   error => {
//     // Do something with response error
//
//     console.error(error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
