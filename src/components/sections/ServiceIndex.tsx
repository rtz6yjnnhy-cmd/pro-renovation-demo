"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LineMask } from "@/components/motion/Reveal";
import { services } from "@/lib/site";
import { selectService } from "@/lib/select-service";

/*
 * Adapted from the 21st.dev "Index List Image Gallery" (kedhareswer/index-list-carousel):
 * a typographic index where the active row opens and its photo wipes in over the
 * previous one — from the right going down the list, from the left going back up.
 * Rebuilt on the project's tokens, next/image and service data; autoplay removed.
 */

type Layer = "on" | "was" | "after" | "before";

function layerOf(i: number, active: number, previous: number): Layer {
  return i === active ? "on" : i === previous ? "was" : i > active ? "after" : "before";
}

const layerStyle: Record<Layer, React.CSSProperties> = {
  on: {
    visibility: "visible",
    zIndex: 2,
    clipPath: "inset(0 0 0 0)",
    transform: "none",
    transition: "clip-path 850ms cubic-bezier(.7,0,.2,1), transform 1300ms cubic-bezier(.2,.7,.2,1)",
  },
  was: { visibility: "visible", zIndex: 1, transform: "none" },
  after: { visibility: "hidden", clipPath: "inset(0 0 0 100%)", transform: "scale(1.08)" },
  before: { visibility: "hidden", clipPath: "inset(0 100% 0 0)", transform: "scale(1.08)" },
};

/** Keeps a collapsed panel's links out of the tab order and the accessibility tree. */
function InertUnless({ open, children }: { open: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) ref.current?.removeAttribute("inert");
    else ref.current?.setAttribute("inert", "");
  }, [open]);
  return (
    <div ref={ref} className="overflow-hidden">
      {children}
    </div>
  );
}

export function ServiceIndex() {
  const [{ active, previous }, setState] = useState({ active: 0, previous: -1 });
  const show = (i: number) => setState((s) => (s.active === i ? s : { active: i, previous: s.active }));

  return (
    <section aria-labelledby="scope-heading" className="bg-ink py-24 text-paper md:py-40">
      <div className="shell">
        <h2 id="scope-heading" className="type-display max-w-[16ch] text-2xl">
          <LineMask lines={["What each", "service covers."]} />
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-paper/5 md:order-2 md:col-span-6 md:col-start-7 md:aspect-auto md:min-h-[560px]">
            {services.map((s, i) => (
              <Image
                key={s.id}
                src={s.detailImage}
                alt={i === active ? s.detailAlt : ""}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover motion-reduce:!transition-none"
                style={{ ...layerStyle[layerOf(i, active, previous)], objectPosition: s.detailPosition }}
              />
            ))}
            <p className="absolute bottom-4 right-4 z-[3] text-xs text-paper/70">Illustrative photography</p>
          </div>

          <ul className="md:order-1 md:col-span-6">
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className={`border-b border-paper/15 ${i === 0 ? "border-t" : ""}`}>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`scope-${s.id}`}
                    onMouseEnter={() => show(i)}
                    onFocus={() => show(i)}
                    onClick={() => show(i)}
                    className={`flex w-full items-baseline justify-between gap-6 py-6 text-left transition-[color,padding] duration-500 ease-out ${
                      on ? "pl-3 text-paper" : "text-paper/40 hover:text-paper/70"
                    }`}
                  >
                    <span className="type-heading text-xl md:text-[2.5rem] md:leading-[1.1]">{s.name}</span>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-brand" : "bg-paper/20"}`}
                    />
                  </button>
                  <div
                    id={`scope-${s.id}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                      on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <InertUnless open={on}>
                      <div className="pb-8 pl-3">
                        <p className="max-w-[48ch] text-sm text-haze">{s.summary}</p>
                        <ul className="mt-5 grid gap-2 text-sm text-paper/85 sm:grid-cols-2">
                          {s.scope.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <span aria-hidden="true" className="h-px w-4 bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="#contact"
                          onClick={() => selectService(s.id)}
                          className="mt-6 inline-block py-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
                        >
                          Ask about {s.short.toLowerCase() === "lvp" ? "LVP flooring" : s.short.toLowerCase()}
                        </Link>
                      </div>
                    </InertUnless>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
