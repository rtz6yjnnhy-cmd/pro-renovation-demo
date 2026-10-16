import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Used only for the scripture line in the footer.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-verse",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pro-Renovation by Emerson Services | Home Remodeling in Marietta, GA",
  description:
    "Tile installation, plumbing, interior and exterior painting, hardwood and luxury vinyl plank flooring in Marietta, Georgia. Request an estimate from Emerson Services.",
  // Website concept preview: keep it out of search results until the client approves it.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#17191B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
