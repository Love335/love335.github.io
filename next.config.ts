import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // This is the key line for static hosting on GitHub Pages
  images: {
    unoptimized: true,        // Required because GitHub Pages has no image optimization server
  },
};

export default nextConfig;
