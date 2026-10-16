import Image from "next/image";
import { Reveal, LineMask } from "@/components/motion/Reveal";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { ButtonLink } from "@/components/ui/Button";
import { company, images, services } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="bg-stone py-24 md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative md:max-w-[560px] lg:col-span-5 lg:max-w-none">
          <Reveal y={24}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Image
                src={images.floatingStair}
                alt="Floating wooden stair treads against a sage plaster wall"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 42vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <p className="mt-3 text-xs text-muted">Illustrative photography</p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <h2 className="type-display text-2xl">
            <LineMask lines={["Elevating", "Everyday Living."]} />
          </h2>
          <Reveal className="mt-10 space-y-6 text-base text-ink/80">
            <p className="max-w-[56ch]">
              Pro-Renovation by Emerson Services LLC is a residential remodeling company based in Marietta, Georgia.
              The work centers on the finishes that shape how a home feels every day: the tile underfoot, the
              fixtures you reach for, the color on the walls and the floors that carry it all.
            </p>
            <p className="max-w-[56ch]">
              Whether you are refreshing one room or planning a larger update, it starts with a conversation about
              your space and what you want it to become.
            </p>
          </Reveal>

          <DimensionLine label="Services" tone="dark" className="mt-12" />
          <Reveal as="p" className="mt-6 text-sm text-muted">
            {services.map((s) => s.name).join(", ")}.
          </Reveal>

          <Reveal className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="#contact" variant="dark">
              Request an Estimate
            </ButtonLink>
            <a href={company.phoneHref} className="whitespace-nowrap py-2 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Call {company.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
