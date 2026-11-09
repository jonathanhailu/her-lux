import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryRail } from "@/components/home/CategoryRail";
import { ProductRail } from "@/components/home/ProductRail";
import { ReviewRail } from "@/components/home/ReviewRail";
import { VipBanner } from "@/components/home/VipBanner";
import { SectionHeading } from "@/components/ui-luxe/SectionHeading";
import { LuxeSkeleton } from "@/components/ui-luxe/Skeleton";
import { fetchProducts } from "@/services/products";
import { TESTIMONIALS } from "@/data/mockProducts";
import { Flame, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const trending = products?.filter((p) => p.bestSeller) ?? [];
  const flash = products?.filter((p) => p.oldPrice) ?? [];

  return (
    <div className="space-y-10">
      <HeroBanner />

      <div className="grid grid-cols-3 gap-2 mx-5 -mt-4">
        {[
          { Icon: Truck, label: "Free Shipping" },
          { Icon: ShieldCheck, label: "5-Year Warranty" },
          { Icon: Flame, label: "Hot Drops Weekly" },
        ].map(({ Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="rounded-2xl glass border border-border/60 px-2 py-3 text-center"
          >
            <Icon className="h-4 w-4 mx-auto text-gold" />
            <div className="mt-1 text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{label}</div>
          </motion.div>
        ))}
      </div>

      <section>
        <SectionHeading eyebrow="Shop By" title="Categories" />
        <CategoryRail />
      </section>

      <section>
        <SectionHeading
          eyebrow="Bestsellers"
          title="Trending Wigs"
          action={<Link to="/shop" className="text-[10px] tracking-[0.24em] uppercase text-gold">View all</Link>}
        />
        {isLoading ? (
          <div className="flex gap-3 px-4">
            {[0, 1, 2].map((i) => <LuxeSkeleton key={i} className="aspect-[3/4] w-[210px]" />)}
          </div>
        ) : (
          <ProductRail products={trending.length ? trending : (products ?? []).slice(0, 4)} />
        )}
      </section>

      <VipBanner />

      <section>
        <SectionHeading eyebrow="Limited" title="Flash Sale" />
        {isLoading ? (
          <div className="flex gap-3 px-4">
            {[0, 1, 2].map((i) => <LuxeSkeleton key={i} className="aspect-[3/4] w-[210px]" />)}
          </div>
        ) : (
          <ProductRail products={flash} />
        )}
      </section>

      <section>
        <SectionHeading eyebrow="From The Maison" title="Real Reviews" />
        <ReviewRail />
      </section>

      <section className="mx-5 rounded-3xl bg-card/60 border border-border p-6 space-y-5">
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.id} className="text-center">
            <p className="font-serif text-lg italic leading-snug">"{t.quote}"</p>
            <footer className="mt-2 text-[10px] tracking-[0.28em] uppercase text-gold/80">— {t.author}</footer>
          </blockquote>
        ))}
      </section>
    </div>
  );
}
