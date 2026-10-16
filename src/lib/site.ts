import type { StaticImageData } from "next/image";

import heroDusk from "@/assets/images/hero-dusk-house.jpg";
import tileMarble from "@/assets/images/tile-marble-shower.jpg";
import tileSetting from "@/assets/images/tile-setting.jpg";
import plumbingBrass from "@/assets/images/plumbing-brass-shower.jpg";
import paintingRoller from "@/assets/images/painting-roller.jpg";
import paintingExterior from "@/assets/images/painting-exterior-home.jpg";
import hardwoodLiving from "@/assets/images/hardwood-living-room.jpg";
import hardwoodStair from "@/assets/images/hardwood-stair.jpg";
import lvpRoom from "@/assets/images/lvp-plank-room.jpg";
import floatingStair from "@/assets/images/detail-floating-stair.jpg";
import spiralStair from "@/assets/images/detail-spiral-stair.jpg";
import kitchenWhite from "@/assets/images/kitchen-white-island.jpg";
import kitchenBlack from "@/assets/images/kitchen-black-brass.jpg";
import bathMarble from "@/assets/images/bath-marble-vanity.jpg";
import bathGrey from "@/assets/images/bath-grey-marble.jpg";
import bathShower from "@/assets/images/bath-tiled-shower.jpg";
import exteriorModern from "@/assets/images/exterior-modern-wood.jpg";
import plumbingFaucet from "@/assets/images/plumbing-faucet.jpg";
import kitchenOpenLight from "@/assets/images/kitchen-open-light.jpg";
import hardwoodKitchen from "@/assets/images/hardwood-kitchen-oak.jpg";
import livingPanorama from "@/assets/images/living-panorama.jpg";

export const company = {
  brand: "Pro-Renovation",
  legalName: "Pro-Renovation by Emerson Services LLC",
  tradeName: "Remodeling - Emerson Services",
  street: "386 Virginia Pl",
  city: "Marietta, Georgia",
  phone: "(225) 502-4722",
  phoneHref: "tel:+12255024722",
  email: "gracianoemeson@gmail.com",
  emailHref: "mailto:gracianoemeson@gmail.com",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const images = {
  heroDusk,
  tileMarble,
  tileSetting,
  plumbingBrass,
  paintingRoller,
  paintingExterior,
  hardwoodLiving,
  hardwoodStair,
  lvpRoom,
  floatingStair,
  spiralStair,
  kitchenWhite,
  kitchenBlack,
  bathMarble,
  bathGrey,
  bathShower,
  exteriorModern,
  plumbingFaucet,
  kitchenOpenLight,
  hardwoodKitchen,
  livingPanorama,
};

export type Service = {
  id: string;
  name: string;
  short: string;
  summary: string;
  scope: string[];
  image: StaticImageData;
  alt: string;
  detailImage: StaticImageData;
  detailAlt: string;
  /** CSS object-position for crops that should favor the floor. */
  position?: string;
  detailPosition?: string;
};

export const services: Service[] = [
  {
    id: "tile",
    name: "Tile Installation",
    short: "Tile",
    summary: "Floors, walls and showers set with straight lines, even joints and clean edges.",
    scope: ["Bathroom floors and walls", "Shower surrounds", "Kitchen backsplashes"],
    image: images.tileMarble,
    alt: "Walk-in shower with large marble-look wall tile and a freestanding tub",
    detailImage: images.tileSetting,
    detailAlt: "Installer setting floor tile in fresh mortar",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    short: "Plumbing",
    summary: "Fixtures, faucets and fittings installed so the finished room works as well as it looks.",
    scope: ["Faucets and fixtures", "Shower and tub fittings", "Kitchen and bath connections"],
    image: images.plumbingBrass,
    alt: "Brushed brass shower fixtures against white marble tile",
    detailImage: images.plumbingFaucet,
    detailAlt: "Chrome single-lever faucet over a white basin",
  },
  {
    id: "painting",
    name: "Interior & Exterior Painting",
    short: "Painting",
    summary: "Careful preparation and even coats for walls, ceilings, trim and home exteriors.",
    scope: ["Interior walls and ceilings", "Trim and doors", "Exterior siding and details"],
    image: images.paintingExterior,
    alt: "Two-story suburban home with blue siding, white trim and a red front door",
    detailImage: images.paintingRoller,
    detailAlt: "Paint roller moving across a white interior wall",
  },
  {
    id: "hardwood",
    name: "Hardwood Flooring",
    short: "Hardwood",
    summary: "Natural wood floors installed to bring warmth and character to everyday rooms.",
    scope: ["Living and dining areas", "Bedrooms and hallways", "Stair treads"],
    image: images.hardwoodKitchen,
    alt: "Open kitchen with black and oak cabinetry over wide natural oak floors",
    position: "50% 80%",
    detailImage: images.hardwoodLiving,
    detailAlt: "Bright living room with hardwood floors, a fireplace and a seating area",
    detailPosition: "50% 85%",
  },
  {
    id: "lvp",
    name: "Luxury Vinyl Plank Flooring",
    short: "LVP",
    summary: "Durable, water-resistant plank floors with the look of wood, made for busy homes.",
    scope: ["Kitchens and baths", "Basements and open plans", "High-traffic rooms"],
    image: images.lvpRoom,
    alt: "Empty family room with long wood-look vinyl planks and a sliding patio door",
    position: "30% 50%",
    detailImage: images.kitchenOpenLight,
    detailAlt: "Open white kitchen with light plank flooring and pendant lights",
  },
];
