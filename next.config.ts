import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: path.resolve(__dirname),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kaelee-s3-bucket.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
    ],
  },
};

export default nextConfig;
