import { AxiosRequestConfig } from 'axios';
import axiosInstance from './instance';
import { ApiResponse } from '@repo/types';

// Utility functions for common HTTP methods
export const apiClient = {
  // GET request - extracts data from response
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get<ApiResponse<T>>(url, config).then(response => {
      // Axios interceptor already handles success/error cases
      // We just need to return the data portion
      return response.data.data as T;
    });
  },

  // POST request - extracts data from response
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.post<ApiResponse<T>>(url, data, config).then(response => {
      return response.data.data as T;
    });
  },

  // PUT request - extracts data from response
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.put<ApiResponse<T>>(url, data, config).then(response => {
      return response.data.data as T;
    });
  },

  // PATCH request - extracts data from response
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.patch<ApiResponse<T>>(url, data, config).then(response => {
      return response.data.data as T;
    });
  },

  // DELETE request - extracts data from response
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete<ApiResponse<T>>(url, config).then(response => {
      return response.data.data as T;
    });
  },

  // Raw axios instance for custom requests
  instance: axiosInstance,
};

export default apiClient; 