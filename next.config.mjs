import { DEVICE_SIZES, IMAGE_SIZES } from "./image-widths.mjs";

// Set by the GitHub Actions workflow from actions/configure-pages
// (e.g. "/emerson-services-demo"). Empty locally, so `npm run dev` serves at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.js",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
};

export default nextConfig;
