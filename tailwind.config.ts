import type { Config } from "tailwindcss";

const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: rgb("ink"),
        paper: rgb("paper"),
        stone: rgb("stone"),
        muted: rgb("muted"),
        haze: rgb("haze"),
        line: rgb("line"),
        brand: rgb("brand"),
        ember: rgb("ember"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        verse: ["var(--font-verse)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.4" }],
        sm: ["0.9375rem", { lineHeight: "1.5" }],
        base: ["1.0625rem", { lineHeight: "1.65" }],
        lg: ["1.25rem", { lineHeight: "1.55" }],
        xl: ["clamp(1.5rem, 1.2rem + 1vw, 2rem)", { lineHeight: "1.2" }],
        "2xl": ["clamp(2.25rem, 1.4rem + 3vw, 4rem)", { lineHeight: "1.02" }],
        display: ["clamp(3rem, 1.2rem + 7.4vw, 9.5rem)", { lineHeight: "0.92" }],
        hero: ["clamp(2.125rem, 0.5rem + 4.6vw, 6.25rem)", { lineHeight: "0.94" }],
      },
      maxWidth: {
        site: "1440px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
