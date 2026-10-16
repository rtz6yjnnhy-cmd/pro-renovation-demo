"use client";

/*
 * Architectural depth stage — adapted from the 21st.dev "3D animation" (PoemAnimation).
 *
 * The original stacks a background photo, a 3D CSS box whose inner walls carry
 * a continuously scrolling text band, a cut-out subject in front of the box and
 * a mirrored copy of the box as a reflection. Its stylesheet was not included
 * (no cube geometry, face transforms or preserve-3d) and its keyframes animated
 * `margin-left` across 54,000px, which forces layout on every frame.
 *
 * This version keeps the idea and rebuilds it for a house photograph:
 * - the scene is a fixed 1000×667 stage (the photo's 3:2 ratio) scaled to cover
 *   the viewport, so the foreground cut-out always lines up with the photo;
 * - the walls wrap the real service names around the house and pass *behind*
 *   the roofline (foreground = the same photo clipped to the house silhouette);
 * - the marquee moves with transforms only, and the pointer shifts the
 *   perspective origin for a subtle parallax on desktop;
 * - phones get a flat single band (no 3D walls, no reflection), and reduced
 *   motion gets a still composition.
 */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

export const STAGE_W = 1000;
export const STAGE_H = 667;

type Mode = "full" | "lite";

type ArchitecturalDepthStageProps = {
  image: StaticImageData;
  alt: string;
  /** Stage-pixel polygon of everything that should sit in front of the walls. */
  foregroundClip: string;
  /** Phrases that run around the walls. */
  wallText: string[];
  /** Horizontal point of interest (0–1) kept in view on narrow screens. */
  focalX?: number;
  /** Vertical point of interest (0–1) kept in view on wide, short screens. */
  focalY?: number;
  className?: string;
};

/** Phones: lower the scene so a strip of night sky opens above the roofline for the band. */
const LITE_DROP = 0.13;

function useCoverTransform(focalX: number, focalY: number, mode: Mode) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0, s: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      const s = Math.max(w / STAGE_W, h / STAGE_H);
      const sw = STAGE_W * s;
      const sh = STAGE_H * s;
      const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
      setT({
        s,
        x: clamp(w / 2 - focalX * sw, w - sw, 0),
        y: mode === "lite" ? h * LITE_DROP : clamp(h / 2 - focalY * sh, h - sh, 0),
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [focalX, focalY, mode]);

  return { ref, ...t };
}

function useMode(): Mode {
  const [mode, setMode] = useState<Mode>("lite");
  useEffect(() => {
    // 3D walls only where there is room and a precise pointer; phones get the flat band.
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setMode(mq.matches ? "full" : "lite");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mode;
}

function Band({ phrases }: { phrases: string[] }) {
  // Two identical halves so the -50% loop is seamless.
  const half = (
    <>
      {phrases.map((p) => (
        <span key={p} className="a3d-phrase">
          {p}
          <span className="a3d-mark" aria-hidden="true" />
        </span>
      ))}
    </>
  );
  return (
    <div className="a3d-track" aria-hidden="true">
      {half}
      {half}
    </div>
  );
}

function Room({ phrases, mirrored = false }: { phrases: string[]; mirrored?: boolean }) {
  return (
    <div className={`a3d-room${mirrored ? " a3d-room--reflect" : ""}`} aria-hidden="true">
      <div className="a3d-cube">
        <div className="a3d-face a3d-face--left" style={{ "--a3d-offset": "0px" } as React.CSSProperties}>
          <Band phrases={phrases} />
        </div>
        <div className="a3d-face a3d-face--back" style={{ "--a3d-offset": "900px" } as React.CSSProperties}>
          <Band phrases={phrases} />
        </div>
        <div className="a3d-face a3d-face--right" style={{ "--a3d-offset": "1900px" } as React.CSSProperties}>
          <Band phrases={phrases} />
        </div>
      </div>
    </div>
  );
}

export function ArchitecturalDepthStage({
  image,
  alt,
  foregroundClip,
  wallText,
  focalX = 0.5,
  focalY = 0.5,
  className = "",
}: ArchitecturalDepthStageProps) {
  const mode = useMode();
  const { ref, x, y, s } = useCoverTransform(focalX, focalY, mode);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Pointer parallax: nudge the perspective origin so the walls shift against the house.
  useEffect(() => {
    const scene = sceneRef.current;
    if (mode !== "full" || !scene) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        scene.style.setProperty("--a3d-ox", `${50 + px * 14}%`);
        scene.style.setProperty("--a3d-oy", `${50 + py * 10}%`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [mode]);

  // The stage is rendered at 1000px wide and scaled up, so request the photo at its displayed size.
  const sizes = "(max-aspect-ratio: 3/2) 150vh, 100vw";

  return (
    <div ref={ref} className={`a3d-viewport ${className}`}>
      <div
        className="a3d-stage"
        style={{ transform: `translate3d(${x}px, ${y}px, 0) scale(${s})` }}
        data-mode={mode}
      >
        <div ref={sceneRef} className="a3d-camera">
          <Image src={image} alt={alt} fill priority placeholder="blur" sizes={sizes} className="a3d-photo" />

          {mode === "full" ? (
            <Room phrases={wallText} />
          ) : (
            <div className="a3d-flat" aria-hidden="true">
              <Band phrases={wallText} />
            </div>
          )}

          {/* The house itself, in front of the walls */}
          <div className="a3d-foreground" style={{ clipPath: foregroundClip }}>
            <Image src={image} alt="" fill placeholder="blur" sizes={sizes} className="a3d-photo" />
          </div>

          {mode === "full" && <Room phrases={wallText} mirrored />}
        </div>
      </div>
    </div>
  );
}
