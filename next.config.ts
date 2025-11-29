import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: { domains: ["avatars.githubusercontent.com"] },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    prependData: `@use "abstracts/index" as *;`,
  },
};

export default nextConfig;
