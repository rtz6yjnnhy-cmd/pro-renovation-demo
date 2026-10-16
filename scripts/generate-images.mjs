// Pre-renders responsive WebP versions of every photo for the static export.
// next/image cannot optimize at request time on GitHub Pages, so the custom
// loader (src/lib/image-loader.js) points each srcset width at a file made here.
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS, IMAGE_QUALITY, OUTPUT_DIR } from "../image-widths.mjs";

const SRC_DIR = "src/assets/images";

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(SRC_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
let written = 0;
let skipped = 0;

for (const file of files) {
  const input = path.join(SRC_DIR, file);
  const name = file.replace(/\.[^.]+$/, "");
  const sourceTime = statSync(input).mtimeMs;

  for (const width of IMAGE_WIDTHS) {
    const output = path.join(OUTPUT_DIR, `${name}-${width}.webp`);
    if (existsSync(output) && statSync(output).mtimeMs >= sourceTime) {
      skipped++;
      continue;
    }
    // Widths above the source size reuse the full-size image; never upscale.
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: IMAGE_QUALITY, effort: 5 })
      .toFile(output);
    written++;
  }
}

console.log(`Responsive images: ${written} written, ${skipped} up to date (${files.length} sources).`);
