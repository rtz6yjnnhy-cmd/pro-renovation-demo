// Shared by next.config.mjs (srcset widths) and scripts/generate-images.mjs (files on disk).
export const DEVICE_SIZES = [640, 828, 1080, 1280, 1600, 1920, 2600];
export const IMAGE_SIZES = [384];
export const IMAGE_WIDTHS = [...IMAGE_SIZES, ...DEVICE_SIZES];
export const IMAGE_QUALITY = 75;
export const OUTPUT_DIR = "public/img-opt";
