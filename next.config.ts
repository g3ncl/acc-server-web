import type { NextConfig } from "next";
import { version } from "./package.json";
const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/status",
        permanent: true,
      },
    ];
  },
  output: "standalone",
  env: {
    version: version,
  },
};
export default nextConfig;
