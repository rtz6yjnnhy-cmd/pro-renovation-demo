"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { ArchitecturalDepthStage } from "@/components/ui/3d-animation";
import { LineMask } from "@/components/motion/Reveal";
import { images, services } from "@/lib/site";
import { ease } from "@/lib/motion";

// House silhouette in stage pixels (1000×667): gabled addition, original house and chimney,
// plus the yard and driveway. Everything inside sits in front of the 3D walls.
const HOUSE_CLIP = `polygon(
  0px 667px, 0px 392px, 108px 390px, 112px 272px, 120px 265px, 294px 78px, 498px 94px,
  598px 214px, 600px 222px, 636px 215px, 636px 189px, 669px 189px, 669px 208px,
  775px 190px, 791px 186px, 801px 212px, 806px 262px, 812px 360px, 1000px 372px, 1000px 667px
)`;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: stageY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: ease.out }}
      >
        <ArchitecturalDepthStage
          image={images.heroDusk}
          alt="Modern gabled home addition with glowing windows beside a classic brick house at dusk"
          foregroundClip={HOUSE_CLIP}
          wallText={services.map((s) => s.name)}
          focalX={0.42}
          focalY={0.4}
        />
        {/* Legibility: night sky at the top for the navigation, deep ground for the headline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell flex h-full flex-col justify-end pb-8 pt-[calc(var(--nav-h)+24px)] md:pb-14"
      >
        <h1 className="type-hero text-hero uppercase">
          <LineMask lines={["We don't just renovate.", "We redefine spaces."]} immediate delay={0.8} />
        </h1>

        <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.p
            className="max-w-[34ch] text-lg text-paper/85 md:text-xl lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 1.3 }}
          >
            Premium Remodeling &amp; Home Improvements in Marietta, Georgia.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row lg:col-span-7 lg:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 1.45 }}
          >
            <ButtonLink href="#services" className="uppercase tracking-[0.08em]">
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline-light" className="uppercase tracking-[0.08em]">
              Request an Estimate
            </ButtonLink>
          </motion.div>
        </div>

        <DimensionLine label="Pro-Renovation by Emerson Services" immediate delay={1.6} className="mt-8 hidden md:mt-10 md:flex" />
      </motion.div>

      <p className="absolute bottom-2 right-6 max-w-[calc(100%-48px)] text-right text-[11px] text-paper/70 md:bottom-4 md:right-12 md:text-xs xl:right-16">
        Unofficial website concept · Illustrative photography
      </p>
    </section>
  );
}
