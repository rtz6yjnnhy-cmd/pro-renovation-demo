import Link from "next/link";

type Variant = "primary" | "outline-light" | "outline-dark" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-paper",
  dark: "bg-ink text-paper hover:bg-brand hover:text-ink",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  "outline-dark": "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center whitespace-nowrap justify-center rounded-full px-8 text-sm font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
