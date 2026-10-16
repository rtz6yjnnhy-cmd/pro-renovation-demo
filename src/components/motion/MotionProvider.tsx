"use client";

import { MotionConfig } from "framer-motion";

/** Honors the OS reduced-motion setting for every transform animation on the page. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
