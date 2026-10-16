import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { company, nav, services } from "@/lib/site";

const footerServices = services.map((s) => (s.id === "lvp" ? "LVP Flooring" : s.id === "painting" ? "Painting" : s.name));

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      {/* Phone: brand, then two link columns, then contact. Tablet: brand row over three
          proportioned columns. Desktop: the original 12-column layout. */}
      <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.5fr)] md:gap-y-16 md:py-24 lg:grid-cols-12 lg:gap-y-12">
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 text-sm text-haze">
            {company.legalName}
            <br />
            {company.city}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
          <p className="text-sm text-haze">Explore</p>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 text-sm text-paper/85 transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="text-sm text-haze">Services</p>
          <ul className="mt-4 space-y-1">
            {footerServices.map((s) => (
              <li key={s}>
                <Link href="#services" className="inline-block py-1 text-sm text-paper/85 transition-colors hover:text-brand">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <p className="text-sm text-haze">Contact</p>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={company.phoneHref} className="inline-block py-1 text-sm text-paper/85 transition-colors hover:text-brand">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="inline-block py-1 text-sm text-paper/85 [overflow-wrap:anywhere] transition-colors hover:text-brand">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Reveal y={8} className="shell border-t border-paper/10 py-16 text-center md:py-24">
        <figure>
          <div aria-hidden="true" className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-paper/20 md:w-20" />
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <path d="M1 11 11 2l10 9" stroke="rgb(var(--brand))" strokeWidth="1.5" />
            </svg>
            <span className="h-px w-12 bg-paper/20 md:w-20" />
          </div>
          <blockquote className="mx-auto mt-8 max-w-[34ch] font-verse text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] italic leading-[1.35] text-paper/90">
            <p>
              &ldquo;And whatsoever ye do, do it heartily,
              <br className="hidden md:block" /> as to the Lord, and not unto men.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 text-sm text-haze">Colossians 3:23 (KJV)</figcaption>
        </figure>
      </Reveal>

      <div className="shell flex flex-col gap-2 border-t border-paper/10 py-8 text-xs text-haze lg:flex-row lg:justify-between">
        <p>
          © {new Date().getFullYear()} {company.legalName}
        </p>
        <p>Website Concept — Preview. An unofficial design proposal, not the official Emerson Services website. Photography is illustrative and does not depict company projects.</p>
      </div>
    </footer>
  );
}
