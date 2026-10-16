"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Fine-pointer devices only: touch screens and reduced motion get a still card. */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
};

/** Leans the card toward the pointer in real perspective, then settles back on leave. */
export function Tilt({ children, className, max = 5 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);

  const active = fine && !reduce;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      onPointerMove={
        active
          ? (e) => {
              const r = ref.current?.getBoundingClientRect();
              if (!r) return;
              px.set((e.clientX - r.left) / r.width - 0.5);
              py.set((e.clientY - r.top) / r.height - 0.5);
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              px.set(0);
              py.set(0);
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
