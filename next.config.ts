import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["node:sqlite", "ioredis"],
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
