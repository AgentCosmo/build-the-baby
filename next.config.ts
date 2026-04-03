import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ws-na.amazon-adsystem.com',
      },
    ],
  },
};

export default nextConfig;
