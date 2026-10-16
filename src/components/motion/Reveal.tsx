"use client";

import { motion } from "framer-motion";
import { duration, ease } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
};

/** Quiet entrance: short rise and fade, once, when the element enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </Tag>
  );
}

type LineMaskProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
};

/** Headline lines rising out of a mask, one after another. */
export function LineMask({ lines, className, lineClassName, delay = 0, immediate = false }: LineMaskProps) {
  const trigger = immediate
    ? { animate: "shown" }
    : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: 0.9, ease: ease.out, delay: delay + i * 0.1 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
