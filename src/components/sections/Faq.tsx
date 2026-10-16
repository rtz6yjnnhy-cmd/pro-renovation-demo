"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LineMask, Reveal } from "@/components/motion/Reveal";
import { company } from "@/lib/site";

/*
 * Adapted from the 21st.dev "Accordion" (ddoemonn/accordion): auto-measured
 * panel height animated with a spring, arrow-key/Home/End navigation between
 * questions and inert closed panels. Restyled on the project's tokens.
 */

const DISCLOSE = { type: "spring", stiffness: 420, damping: 40, mass: 0.7 } as const;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Item = { q: string; a: React.ReactNode };

const link = "whitespace-nowrap font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink";

const faqs: Item[] = [
  {
    q: "What remodeling services do you offer?",
    a: (
      <p>
        Pro-Renovation by Emerson Services offers tile installation, plumbing, interior and exterior painting,
        hardwood flooring and luxury vinyl plank (LVP) flooring.
      </p>
    ),
  },
  {
    q: "How can I request an estimate?",
    a: (
      <p>
        Fill in the estimate form on this page, call{" "}
        <a href={company.phoneHref} className={link}>
          {company.phone}
        </a>
        , or email{" "}
        <a href={company.emailHref} className={`${link} !whitespace-normal break-all`}>
          {company.email}
        </a>{" "}
        with a few details about your project.
      </p>
    ),
  },
  {
    q: "Do you offer flooring installation?",
    a: <p>Yes. Flooring services include hardwood flooring and luxury vinyl plank (LVP) flooring.</p>,
  },
  {
    q: "Do you paint both interiors and exteriors?",
    a: <p>Yes. Painting services cover both interior and exterior painting.</p>,
  },
  {
    q: "Where are you located?",
    a: (
      <p>
        Emerson Services is located at {company.street}, {company.city}.
      </p>
    ),
  },
  {
    q: "How do I get in touch?",
    a: (
      <p>
        Call{" "}
        <a href={company.phoneHref} className={link}>
          {company.phone}
        </a>{" "}
        or email{" "}
        <a href={company.emailHref} className={`${link} !whitespace-normal break-all`}>
          {company.email}
        </a>
        .
      </p>
    ),
  },
];

function useAutoHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setHeight(el.getBoundingClientRect().height);
    read();
    setReady(true);
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, height, ready };
}

function Row({
  item,
  index,
  open,
  onToggle,
  onKey,
  baseId,
  buttonRef,
}: {
  item: Item;
  index: number;
  open: boolean;
  onToggle: () => void;
  onKey: (e: React.KeyboardEvent) => void;
  baseId: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const reduced = useReducedMotion();
  const { ref, height, ready } = useAutoHeight();
  const headerId = `${baseId}-q-${index}`;
  const panelId = `${baseId}-a-${index}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [ref, open]);

  return (
    <div className="border-b border-ink/15">
      <h3>
        <button
          ref={buttonRef}
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKey}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
        >
          <span className="type-heading text-lg md:text-xl">{item.q}</span>
          <span
            aria-hidden="true"
            className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              open ? "border-brand bg-brand" : "border-ink/20 group-hover:border-ink"
            }`}
          >
            <span className="absolute h-px w-4 bg-ink" />
            <motion.span
              className="absolute h-4 w-px bg-ink"
              initial={false}
              animate={{ scaleY: open ? 0 : 1 }}
              transition={reduced ? { duration: 0 } : DISCLOSE}
            />
          </span>
        </button>
      </h3>
      <motion.div
        initial={false}
        animate={ready ? { height: open ? height : 0 } : {}}
        transition={reduced ? { duration: 0 } : DISCLOSE}
        style={{ overflow: "hidden", height: ready ? undefined : open ? "auto" : 0 }}
      >
        <div ref={ref} id={panelId} role="region" aria-labelledby={headerId}>
          <motion.div
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: open ? 0.25 : 0.15 }}
            className="max-w-[60ch] pb-8 pr-16 text-muted"
          >
            {item.a}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (i: number) => (e: React.KeyboardEvent) => {
    const n = faqs.length;
    const target =
      e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (target < 0) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-paper py-24 md:py-40">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 id="faq-heading" className="type-display text-2xl">
            <LineMask lines={["Questions,", "answered."]} />
          </h2>
          <Reveal className="mt-8">
            <p className="max-w-[32ch] text-muted">
              Don&apos;t see your question here? Call{" "}
              <a href={company.phoneHref} className={link}>
                {company.phone}
              </a>
              .
            </p>
          </Reveal>
        </div>
        <div className="border-t border-ink/15 md:col-span-7 md:col-start-6">
          {faqs.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen((cur) => (cur === i ? null : i))}
              onKey={onKey(i)}
              baseId={baseId}
              buttonRef={(el) => {
                buttons.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
