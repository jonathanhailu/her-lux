import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HERO_IMAGE } from "@/data/mockProducts";

export function HeroBanner() {
  return (
    <section className="relative mx-5 mt-3 overflow-hidden rounded-[2rem] shadow-luxe">
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        src={HERO_IMAGE}
        alt="Luxury hair model"
        className="h-[460px] w-full object-cover"
        width={1024}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.32em] text-gold mb-3"
        >
          <Sparkles className="h-3 w-3" /> Spring '26 Collection
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-serif text-[40px] leading-[1.02] tracking-tight"
        >
          The Hair of <span className="italic text-gradient-gold">Her Dreams.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-3 text-sm text-muted-foreground max-w-[18rem]"
        >
          Hand-tied HD lace wigs & raw bundles, delivered to your door.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-5"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 h-12 text-ink text-[11px] tracking-[0.28em] uppercase font-semibold shadow-gold-glow"
          >
            Shop the Drop <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}