import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { createApiError, createValidationError, NetworkError } from "./errors";

// Extend the config type to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: Date };
}

// Helper function to get token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem('auth_token');
};

// Request interceptor
export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {
      // Add request timestamp for debugging
      config.metadata = { startTime: new Date() };

      // Add JWT token to Authorization header if available in localStorage
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (process.env.NODE_ENV === "development") {
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            data: config.data,
            params: config.params,
            headers: config.headers,
          },
        );
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    },
  );
};

// Response interceptor
export const setupResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Calculate response time
      const endTime = new Date();
      const startTime = (response.config as ExtendedAxiosRequestConfig).metadata
        ?.startTime;
      const responseTime = startTime
        ? endTime.getTime() - startTime.getTime()
        : 0;

      // Log response in development
      if (process.env.NODE_ENV === "development") {
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
          {
            status: response.status,
            responseTime: `${responseTime}ms`,
            data: response.data,
          },
        );
      }

      // Check if the response indicates an error from our API
      if (response.data && !response.data.success) {
        const error = createApiError(
          response.status,
          response.data.error || "API request failed",
          response.data,
        );
        return Promise.reject(error);
      }

      return response;
    },
    (error: AxiosError) => {
      // Calculate response time for errors
      const endTime = new Date();
      const startTime = (error.config as ExtendedAxiosRequestConfig)?.metadata
        ?.startTime;
      const responseTime = startTime
        ? endTime.getTime() - startTime.getTime()
        : 0;

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error(
          `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          {
            status: error.response?.status,
            responseTime: `${responseTime}ms`,
            error: error.message,
            response: error.response?.data,
          },
        );
      }

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        switch (status) {
          case 401:
            // Unauthorized - clear localStorage and redirect to login
            if (typeof window !== "undefined") {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_data');
              // You could trigger a redirect here or emit an event
              window.location.href = '/auth/sign-in';
            }
            break;
          case 422:
            // Validation error - create specific validation error
            const validationError = createValidationError(
              (data as any)?.error || "Validation failed",
              (data as any)?.fieldErrors,
            );
            return Promise.reject(validationError);
          default:
            // Other error statuses
            break;
        }

        // Create custom error with server response
        const apiError = createApiError(
          status,
          (data as any)?.error || "Request failed",
          data,
        );
        return Promise.reject(apiError);
      } else if (error.request) {
        // Request was made but no response received
        const networkError = new NetworkError(
          "No response received from server",
        );
        return Promise.reject(networkError);
      } else {
        // Something else happened while setting up the request
        const setupError = new Error(`Request setup failed: ${error.message}`);
        return Promise.reject(setupError);
      }
    },
  );
};
