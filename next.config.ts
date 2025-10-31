import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/stats/:match*",
        destination: "https://cloud.umami.is/:match*",
      },
      {
        source: "/api/send",
        destination: "https://cloud.umami.is/api/send",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
