import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getApiConfig } from './config';
import { setupRequestInterceptor, setupResponseInterceptor } from './interceptors';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(getApiConfig());

// Setup interceptors
setupRequestInterceptor(axiosInstance);
setupResponseInterceptor(axiosInstance);

export default axiosInstance; 