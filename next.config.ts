import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.scdn.co"], // Add this line to allow Spotify album art
  },
};

export default nextConfig;
