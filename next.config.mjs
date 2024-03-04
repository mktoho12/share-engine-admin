/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4566",
        pathname: "/shareengine-storage/**",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
