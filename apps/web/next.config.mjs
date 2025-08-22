/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Properly configure webpack for path aliases
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
  // Ensure proper module resolution
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
