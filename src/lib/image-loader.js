// Custom next/image loader for the static export (GitHub Pages).
// Maps a static import such as `/_next/static/media/hero-dusk-house.3452329a.jpg`
// and a srcset width to the pre-rendered `/img-opt/hero-dusk-house-1920.webp`.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src, width }) {
  const file = src.split("/").pop() || "";
  const match = file.match(/^(.+?)\.[0-9a-f]{6,}\.(?:jpe?g|png|webp)$/i);
  if (!match) return src;
  return `${basePath}/img-opt/${match[1]}-${width}.webp`;
}
