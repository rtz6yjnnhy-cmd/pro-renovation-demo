"use client";

import { useEffect, useState } from "react";
import { LineMask, Reveal } from "@/components/motion/Reveal";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { company, services } from "@/lib/site";
import { SELECT_SERVICE_EVENT } from "@/lib/select-service";

const field =
  "mt-2 block w-full min-h-[52px] rounded-[2px] border border-paper/20 bg-paper/[0.04] px-4 text-base text-paper placeholder:text-paper/40 transition-colors focus:border-brand focus:outline-none";
const label = "text-sm font-medium text-paper/80";

export function Contact() {
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onSelect = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  // No backend in this concept: the form composes an email in the visitor's mail app.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const chosen = services.find((s) => s.id === data.get("service"))?.name ?? "Not sure yet";
    const subject = `Estimate request: ${chosen}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Service: ${chosen}`,
      "",
      `${data.get("message") || ""}`,
    ].join("\n");
    window.location.href = `${company.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden bg-ink py-24 text-paper md:py-40">
      <div className="shell">
        <h2 id="contact-heading" className="type-display text-display">
          <LineMask lines={["Ready to Reimagine", "Your Space?"]} />
        </h2>
        <DimensionLine label="Request an Estimate" className="mt-12 md:mt-16" />

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="text-lg text-paper/85">Let&apos;s talk about your next home improvement project.</p>
            <dl className="mt-10 space-y-8">
              <div>
                <dt className="text-sm text-haze">Phone</dt>
                <dd className="mt-1">
                  <a href={company.phoneHref} className="type-heading text-xl transition-colors hover:text-brand">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-haze">Email</dt>
                <dd className="mt-1">
                  <a href={company.emailHref} className="break-all text-lg font-medium transition-colors hover:text-brand">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-haze">Location</dt>
                <dd className="mt-1 text-lg">{company.city}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className={label}>Name</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>
                  Phone <span className="text-paper/50">(optional)</span>
                </span>
                <input name="phone" type="tel" autoComplete="tel" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>Service</span>
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1.5l5 5 5-5%22 stroke=%22%23F7F5F0%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px_8px] bg-[right_16px_center] bg-no-repeat pr-12`}
                >
                  <option value="" className="bg-ink">
                    Not sure yet
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id} className="bg-ink">
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={label}>About your project</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Which room, what you'd like to change, and when you hope to start."
                  className={`${field} py-3`}
                />
              </label>
              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-haze" aria-live="polite">
                  {sent
                    ? "Your email app should open with the request ready to send."
                    : "Sends from your own email app to Emerson Services."}
                </p>
                <button
                  type="submit"
                  className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-full bg-brand px-8 text-sm font-semibold text-ink transition-[background-color,transform] duration-200 hover:bg-paper active:scale-[0.98]"
                >
                  Request an Estimate
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
