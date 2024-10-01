/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV !== "development",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
        pathname: "/img/faces/**",
      },
    ],
  },
};

export default nextConfig;
