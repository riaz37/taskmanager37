// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000, // 10 seconds
  withCredentials: false, // No longer using cookies for authentication
};

// Environment-specific configurations
export const getApiConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    ...API_CONFIG,
    baseURL: isProduction
      ? process.env.NEXT_PUBLIC_API_URL
      : API_CONFIG.baseURL,
    timeout: isProduction ? 15000 : API_CONFIG.timeout, // Longer timeout in production
  };
};
