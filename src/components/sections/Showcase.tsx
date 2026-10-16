"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal, LineMask } from "@/components/motion/Reveal";
import { images } from "@/lib/site";
import { useMediaQuery } from "@/lib/use-media-query";

type Shot = { src: StaticImageData; alt: string; caption: string; ratio: string; position?: string };

const left: Shot[] = [
  {
    src: images.kitchenWhite,
    alt: "White kitchen with a large island, pendant lights and wood-look floors",
    caption: "Kitchen, white shaker cabinetry",
    ratio: "aspect-[4/5]",
  },
  {
    src: images.spiralStair,
    alt: "Curved wooden spiral staircase beneath tall windows",
    caption: "Stair, curved timber",
    ratio: "aspect-square",
  },
];

const center: Shot[] = [
  {
    src: images.bathMarble,
    alt: "Marble-clad bathroom with a round mirror and floating vanity",
    caption: "Bath, book-matched marble",
    position: "50% 75%",
    ratio: "aspect-[3/4]",
  },
  {
    src: images.livingPanorama,
    alt: "Living room with low leather seating facing a full-height window",
    caption: "Living, full-height glazing",
    ratio: "aspect-[4/5]",
  },
];

const right: Shot[] = [
  {
    src: images.exteriorModern,
    alt: "Modern home exterior with vertical wood cladding and white render",
    caption: "Exterior, timber and render",
    ratio: "aspect-[3/4]",
  },
  {
    src: images.bathGrey,
    alt: "Bathroom with grey marble walls, vessel sink and brass mirror",
    caption: "Bath, grey marble and brass",
    ratio: "aspect-[4/5]",
  },
];

function Column({ shots, y, className = "" }: { shots: Shot[]; y: MotionValue<string>; className?: string }) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-6 md:gap-8 ${className}`}>
      {shots.map((s) => (
        <figure key={s.caption} className="group">
          <div className={`relative overflow-hidden rounded-[2px] bg-stone ${s.ratio}`}>
            <Image
              src={s.src}
              alt={s.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1440px) 440px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              style={{ objectPosition: s.position }}
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted">{s.caption}</figcaption>
        </figure>
      ))}
    </motion.div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const still = reduce || !wide;
  // Columns travel at different speeds, like walking past a facade.
  const slow = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["4%", "-4%"]);
  const fast = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["10%", "-10%"]);
  // The board rises from a tilted plane into the wall as it enters the viewport.
  const tilt = useTransform(scrollYProgress, [0, 0.32], still ? [0, 0] : [22, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.32], still ? [1, 1] : [0.9, 1]);

  return (
    <section id="work" className="overflow-hidden bg-paper pb-16 pt-24 md:pb-24 md:pt-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="type-display text-2xl md:col-span-8">
            <LineMask lines={["The finish we", "work toward."]} />
          </h2>
          <Reveal className="md:col-span-4">
            <p className="text-muted">
              A mood board of materials and details for this concept, not completed Emerson Services projects.
              Photographs of finished client work can take their place here.
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={ref}
          style={{ rotateX: tilt, scale: lift, transformPerspective: 1400, transformOrigin: "50% 0%" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-24 md:grid-cols-3 md:gap-8"
        >
          <Column shots={left} y={slow} />
          <Column shots={center} y={fast} className="md:pt-24" />
          <Column shots={right} y={slow} className="hidden md:flex" />
        </motion.div>

        <p className="mt-12 text-xs text-muted">Illustrative photography from Pexels.</p>
      </div>
    </section>
  );
}
