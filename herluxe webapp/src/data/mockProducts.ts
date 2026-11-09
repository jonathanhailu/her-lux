import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import hero from "@/assets/hero-1.jpg";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  options: {
    length: string[];
    density: string[];
    laceType: string[];
    texture: string[];
  };
  badge?: string;
  bestSeller?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "hd-lace-body-wave-24",
    title: "Couture HD Lace Body Wave",
    subtitle: "Hand-tied 13x6 Swiss HD lace",
    category: "hd-lace",
    price: 489,
    oldPrice: 620,
    rating: 4.9,
    reviews: 1284,
    images: [p1, p2, p4],
    description:
      "Our signature 13x6 HD lace wig — undetectable melt, breathable cap, 100% virgin Vietnamese hair. Pre-plucked, bleached knots, ready to wear out of the box.",
    options: {
      length: ["18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""],
      density: ["180%", "200%", "250%"],
      laceType: ["HD Lace", "Swiss Lace", "Transparent"],
      texture: ["Body Wave", "Loose Wave", "Straight"],
    },
    badge: "Bestseller",
    bestSeller: true,
  },
  {
    id: "raw-vietnamese-26",
    title: "Raw Vietnamese Cascade",
    subtitle: "Single-donor, unprocessed",
    category: "raw",
    price: 720,
    rating: 5.0,
    reviews: 412,
    images: [p4, p1, p2],
    description:
      "Single-donor raw Vietnamese hair, never chemically processed. Each bundle is hand-selected for thickness, shine and longevity. Lasts 5+ years with care.",
    options: {
      length: ["20\"", "24\"", "28\"", "32\""],
      density: ["Natural", "Thick"],
      laceType: ["Bundle"],
      texture: ["Straight", "Wavy"],
    },
    badge: "Limited",
  },
  {
    id: "honey-curly-22",
    title: "Sunlit Honey Curls",
    subtitle: "Glueless wear-and-go",
    category: "curly",
    price: 369,
    oldPrice: 449,
    rating: 4.8,
    reviews: 928,
    images: [p3, p2, p1],
    description:
      "Sun-kissed honey blonde curls with a glueless cap. Slip on, snatch, go. Perfect bounce, perfect everywhere.",
    options: {
      length: ["16\"", "18\"", "20\"", "22\""],
      density: ["180%", "200%"],
      laceType: ["HD Lace", "Glueless"],
      texture: ["Deep Curl", "Kinky Curl"],
    },
    badge: "Flash -20%",
  },
  {
    id: "glueless-silk-20",
    title: "Midnight Silk Glueless",
    subtitle: "60 second install",
    category: "glueless",
    price: 299,
    rating: 4.7,
    reviews: 2103,
    images: [p5, p1, p4],
    description:
      "Jet-black silky straight glueless wig with adjustable bands and combs. The 60-second install you've been waiting for.",
    options: {
      length: ["16\"", "18\"", "20\"", "22\"", "24\""],
      density: ["150%", "180%"],
      laceType: ["Glueless"],
      texture: ["Silky Straight"],
    },
    bestSeller: true,
  },
  {
    id: "body-wave-bundles",
    title: "Body Wave Bundle Trio",
    subtitle: "3 bundles + closure",
    category: "bundles",
    price: 259,
    oldPrice: 320,
    rating: 4.9,
    reviews: 1742,
    images: [p4, p2, p1],
    description:
      "Three luxe body wave bundles paired with a matching 4x4 HD closure. Soft, full, runway-ready.",
    options: {
      length: ["18\" / 20\" / 22\"", "20\" / 22\" / 24\"", "24\" / 26\" / 28\""],
      density: ["Natural"],
      laceType: ["4x4 Closure", "5x5 Closure"],
      texture: ["Body Wave"],
    },
    badge: "Set",
  },
  {
    id: "burgundy-bombshell",
    title: "Burgundy Bombshell",
    subtitle: "Pre-colored 1B/Burgundy",
    category: "hd-lace",
    price: 519,
    rating: 4.9,
    reviews: 348,
    images: [p2, p3, p1],
    description:
      "Hand-painted burgundy on jet-black roots. Volume, drama, attitude — in a 13x4 HD lace wig.",
    options: {
      length: ["18\"", "20\"", "22\"", "24\""],
      density: ["200%", "250%"],
      laceType: ["HD Lace"],
      texture: ["Loose Wave", "Body Wave"],
    },
    badge: "New",
  },
];

export const HERO_IMAGE = hero;

export const REVIEWS = [
  { id: "1", name: "Aaliyah", handle: "@aaliyahglows", text: "Finally, a wig that doesn't look like a wig. Got compliments all night.", rating: 5 },
  { id: "2", name: "Zara", handle: "@zara.styles", text: "The HD lace melts INTO my skin. I'm never going back.", rating: 5 },
  { id: "3", name: "Imani", handle: "@imani.x", text: "Shipped fast, packaging felt like Cartier. The hair? Even better.", rating: 5 },
  { id: "4", name: "Naomi", handle: "@naomi.b", text: "Two years in, still bouncing. Worth every cent.", rating: 5 },
];

export const TESTIMONIALS = [
  { id: "t1", quote: "Maison Luxe is the only brand my stylist swears by.", author: "Vogue Hair Edit, 2025" },
  { id: "t2", quote: "Editorial-grade hair you can actually wear daily.", author: "Beauty Insider" },
];