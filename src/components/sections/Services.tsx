"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, LineMask } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { services, type Service } from "@/lib/site";
import { selectService } from "@/lib/select-service";
import { ease } from "@/lib/motion";

// Asymmetric layout: two wide frames, then three tall ones.
const layout: Record<string, { col: string; ratio: string; sizes: string }> = {
  tile: { col: "md:col-span-2 lg:col-span-7", ratio: "aspect-[4/3] lg:aspect-[7/5]", sizes: "(min-width: 1024px) 58vw, 100vw" },
  plumbing: { col: "lg:col-span-5 lg:mt-32", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw" },
  painting: { col: "lg:col-span-4", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  hardwood: { col: "md:mt-24 lg:col-span-4 lg:mt-16", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
  lvp: { col: "lg:col-span-4 lg:mt-32", ratio: "aspect-[4/5]", sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" },
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const l = layout[service.id];
  return (
    <Reveal className={l.col} delay={(index % 3) * 0.08}>
      <Link
        href="#contact"
        onClick={() => selectService(service.id)}
        className="group block"
        aria-label={`${service.name}: request an estimate`}
      >
        <Tilt>
          <div className={`relative overflow-hidden rounded-[2px] bg-stone ${l.ratio}`}>
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: ease.wipe }}
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                placeholder="blur"
                sizes={l.sizes}
                style={{ objectPosition: service.position }}
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-ink/0 p-6 pt-16 transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
              <ul className="flex flex-wrap gap-2">
                {service.scope.map((s) => (
                  <li key={s} className="rounded-full border border-paper/30 px-3 py-1 text-xs text-paper">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tilt>
        <div className="mt-6 flex flex-col gap-4 border-t border-ink/15 pt-6 xl:flex-row xl:items-start xl:justify-between xl:gap-6">
          <div>
            <h3 className="type-heading text-xl">{service.name}</h3>
            <p className="mt-2 max-w-[42ch] text-sm text-muted">{service.summary}</p>
          </div>
          <span className="shrink-0 text-xs font-semibold xl:mt-1 text-ember underline decoration-ember/30 underline-offset-4 transition-colors group-hover:decoration-ember">
            Get an estimate
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-paper py-24 md:py-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="type-display text-2xl md:col-span-7">
            <LineMask lines={["Every surface,", "finished with care."]} />
          </h2>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="text-muted">
              Five specialties that shape how a home looks and feels each day. Choose one to start a conversation
              about your project.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-24 lg:grid-cols-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
