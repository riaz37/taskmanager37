// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000, // 10 seconds
  withCredentials: false, // No longer using cookies for authentication
};

// Environment-specific configurations
export const getApiConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const baseURL = isProduction
    ? process.env.NEXT_PUBLIC_API_URL
    : API_CONFIG.baseURL;

  // Validate production API URL
  if (isProduction && !process.env.NEXT_PUBLIC_API_URL) {
    console.error("❌ CRITICAL ERROR: NEXT_PUBLIC_API_URL is not set in production!");
    console.error("🔧 Please set NEXT_PUBLIC_API_URL in your production environment variables");
    console.error("📝 Example: NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api");
    
    // Fallback to a placeholder that will show the error clearly
    return {
      ...API_CONFIG,
      baseURL: "https://ERROR-API-URL-NOT-SET.com/api",
      timeout: 5000,
    };
  }

  // Log configuration for debugging
  console.log("🔧 API Configuration:", {
    environment: process.env.NODE_ENV,
    baseURL,
    timeout: isProduction ? 15000 : API_CONFIG.timeout,
    hasApiUrl: !!process.env.NEXT_PUBLIC_API_URL,
    apiUrlValue: process.env.NEXT_PUBLIC_API_URL || "NOT SET",
  });

  return {
    ...API_CONFIG,
    baseURL,
    timeout: isProduction ? 15000 : API_CONFIG.timeout, // Longer timeout in production
  };
};
