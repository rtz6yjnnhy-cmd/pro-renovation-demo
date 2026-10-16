import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Highlights } from "@/components/sections/Highlights";
import { Showcase } from "@/components/sections/Showcase";
import { About } from "@/components/sections/About";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Highlights />
        <Showcase />
        <About />
        <ServiceIndex />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
