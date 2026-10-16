"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

type DimensionLineProps = {
  label: string;
  tone?: "light" | "dark";
  className?: string;
  delay?: number;
  /** Draw on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * A drafting-style dimension line: end ticks, a ruled line drawn out from the
 * center, and a label sitting in the gap — the brand's measured signature.
 */
export function DimensionLine({ label, tone = "light", className = "", delay = 0, immediate = false }: DimensionLineProps) {
  const color = tone === "light" ? "bg-paper/50" : "bg-ink/40";
  const text = tone === "light" ? "text-paper" : "text-ink";
  const trigger = immediate
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  const line = {
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { duration: 1.1, ease: ease.inOut, delay: delay + 0.15 } },
  };
  const tick = {
    hidden: { scaleY: 0 },
    shown: { scaleY: 1, transition: { duration: 0.4, ease: ease.out, delay } },
  };

  return (
    <motion.div className={`flex items-center gap-4 ${className}`} initial="hidden" {...trigger}>
      <motion.span variants={tick} className={`h-3 w-px shrink-0 bg-brand`} />
      <motion.span variants={line} className={`h-px flex-1 origin-right ${color}`} />
      <motion.span
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.6, delay: delay + 0.5 } } }}
        className={`type-label shrink-0 ${text}`}
      >
        {label}
      </motion.span>
      <motion.span variants={line} className={`h-px flex-1 origin-left ${color}`} />
      <motion.span variants={tick} className={`h-3 w-px shrink-0 bg-brand`} />
    </motion.div>
  );
}
