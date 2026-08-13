import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/weldondemo",
        destination: "/weldon",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
