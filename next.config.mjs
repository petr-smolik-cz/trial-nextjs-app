/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.dummyjson.com',
          port: '',
          pathname: '/products/images/**',
        },
      ],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === "production",
    },
};

export default nextConfig;
