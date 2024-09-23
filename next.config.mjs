import { Domain } from 'domain';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.cubox.pro',
        pathname: '/**', // 允许所有路径
      },
    ],
  },
};

export default nextConfig;
