import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Disable X-Powered-By header
  poweredByHeader: false,
  
  // Enable gzip compression
  compress: true,
  
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Experimental features for better logging
  experimental: {
    // Enable verbose logging in development
    serverMinification: true,
  },
  
  // Custom headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
