import Axios from "axios";
import {API_HOST} from "../Constants";

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';

export default axiosInstance;
