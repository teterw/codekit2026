import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
