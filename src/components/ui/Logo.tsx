type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Provisional typographic mark for the concept: a gable roofline over the
 * wordmark. Replace with the client's original logo files when available.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const text = tone === "light" ? "text-paper" : "text-ink";
  const sub = tone === "light" ? "text-haze" : "text-muted";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M2 13 15 2l13 11" stroke="rgb(var(--brand))" strokeWidth="2.5" strokeLinecap="square" />
        <path d="M6 12v12h18V12" className={tone === "light" ? "stroke-paper" : "stroke-ink"} strokeWidth="2" />
        <path d="M13 24v-6h4v6" className={tone === "light" ? "stroke-paper" : "stroke-ink"} strokeWidth="2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`whitespace-nowrap text-[13px] font-semibold tracking-[0.04em] [font-stretch:125%] min-[360px]:text-[15px] min-[360px]:tracking-[0.06em] ${text}`}>
          PRO-RENOVATION
        </span>
        <span className={`mt-1 text-[11px] font-medium tracking-[0.02em] ${sub}`}>by Emerson Services</span>
      </span>
    </span>
  );
}
