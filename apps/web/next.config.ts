import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": ".",
      "@lib": "./lib",
      "@components": "./components",
      "@hooks": "./hooks",
      "@services": "./services",
    };
    return config;
  },
};

export default nextConfig;
