import Image from "next/image";
import { Reveal, LineMask } from "@/components/motion/Reveal";
import { images } from "@/lib/site";

const highlights = [
  {
    title: "Interior Improvements",
    text: "Fresh paint, new fixtures and tiled surfaces that make familiar rooms feel new again.",
    includes: ["Painting", "Tile", "Plumbing fixtures"],
    image: images.kitchenBlack,
    alt: "Dark kitchen with marble backsplash, brass pendant lights and white bar stools",
  },
  {
    title: "Flooring Solutions",
    text: "Hardwood for natural warmth, or luxury vinyl plank for durability in busy, high-traffic spaces.",
    includes: ["Hardwood", "Luxury vinyl plank"],
    image: images.hardwoodStair,
    alt: "Wooden staircase with white balusters seen from above",
  },
  {
    title: "Home Renovation Services",
    text: "Several trades brought together for a single room or a larger update, inside and out.",
    includes: ["Kitchens", "Bathrooms", "Exteriors"],
    image: images.bathShower,
    alt: "Bathroom with a glass-enclosed tiled shower and white vanity",
  },
];

export function Highlights() {
  return (
    <section className="bg-ink py-24 text-paper md:py-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="type-label text-brand md:col-span-3">What we take on</p>
          <h2 className="type-display text-2xl md:col-span-9">
            <LineMask lines={["From a single room", "to the whole house."]} />
          </h2>
        </div>

        <ul className="mt-16 grid gap-16 md:mt-24 md:grid-cols-3 md:gap-8">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.1} className="group">
              {/* Arched frame: a doorway, the most familiar architectural opening */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] bg-paper/5">
                <Image
                  src={h.image}
                  alt={h.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1440px) 440px, (min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-brand transition-[width] duration-500 ease-out group-hover:w-14" />
                <h3 className="type-heading text-xl">{h.title}</h3>
              </div>
              <p className="mt-4 max-w-[40ch] text-sm text-haze">{h.text}</p>
              <p className="mt-6 text-xs text-paper/70">{h.includes.join(", ")}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
