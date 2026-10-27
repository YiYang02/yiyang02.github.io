import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node.js server at runtime).
  output: "export",
  // Emit /path/index.html so GitHub Pages serves directory-style URLs.
  trailingSlash: true,
  // The default image loader needs a server; images are pre-optimized at build time instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  // cacheComponents / partialPrefetching (PPR) are unsupported with output: "export".
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
