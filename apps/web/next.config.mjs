/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Configure path aliases
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
