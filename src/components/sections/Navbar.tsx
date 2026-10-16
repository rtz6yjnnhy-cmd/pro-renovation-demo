"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { company, nav } from "@/lib/site";
import { ease } from "@/lib/motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 48));

  // Lock page scroll, trap focus and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items = [toggleRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const light = !solid || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300 ease-out ${
        solid && !open ? "border-b border-ink/10 bg-paper/95 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-4 lg:gap-8">
        <Link href="#top" aria-label="Pro-Renovation, back to top" className="relative z-10">
          <Logo tone={light ? "light" : "dark"} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors xl:text-[12px] xl:tracking-[0.14em] ${
                    light ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-4">
          <a
            href={company.phoneHref}
            className={`hidden whitespace-nowrap py-2 text-[13px] font-medium tracking-[0.02em] transition-colors xl:inline ${
              light ? "text-paper/80 hover:text-paper" : "text-ink/70 hover:text-ink"
            }`}
          >
            {company.phone}
          </a>
          <Link
            href="#contact"
            className={`hidden min-h-[44px] items-center whitespace-nowrap rounded-full px-5 text-[12px] xl:px-6 xl:text-[13px] font-semibold tracking-[0.06em] transition-colors duration-200 sm:inline-flex ${
              light ? "bg-brand text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-brand hover:text-ink"
            }`}
          >
            GET A FREE ESTIMATE
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
              light ? "border-paper/30 text-paper" : "border-ink/20 text-ink"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform duration-300 ease-out ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 -z-0 flex flex-col bg-ink px-6 pb-8 pt-[calc(var(--nav-h)+32px)] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.6, ease: ease.wipe } }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4, ease: ease.inOut } }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-paper/10"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.05, duration: 0.5, ease: ease.out } }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="type-heading block py-4 text-[2.25rem] leading-none text-paper"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand text-sm font-semibold tracking-[0.06em] text-ink"
              >
                GET A FREE ESTIMATE
              </Link>
              <div className="flex justify-between text-sm text-haze">
                <a href={company.phoneHref} className="py-2 hover:text-paper">
                  {company.phone}
                </a>
                <span className="py-2">{company.city}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
