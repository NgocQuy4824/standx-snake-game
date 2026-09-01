import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removes the X-Powered-By: Next.js response header
  poweredByHeader: false,
  output: "standalone",
};

export default nextConfig;
