import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { LuxeSkeleton } from "@/components/ui-luxe/Skeleton";
import { fetchProducts } from "@/services/products";
import { CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop — Maison Luxe" }] }),
  component: ShopPage,
});

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "rating", label: "Top rated" },
] as const;

function ShopPage() {
  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");

  const filtered = useMemo(() => {
    let arr = products.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(q.toLowerCase()),
    );
    if (cat !== "all") arr = arr.filter((p) => p.category === cat);
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, q, cat, sort]);

  return (
    <div>
      <PageHeader title="Shop" />
      <div className="px-5 pt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search HD lace, raw bundles…"
            className="w-full h-12 pl-11 pr-4 rounded-full bg-card border border-border text-sm focus:outline-none focus:border-gold/60 transition"
          />
        </div>

        <div className="-mx-5 px-5 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {[{ id: "all", name: "All", emoji: "✦" }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "shrink-0 h-9 px-4 rounded-full text-xs border transition",
                  cat === c.id
                    ? "bg-gradient-gold text-ink border-transparent shadow-gold-glow"
                    : "bg-card border-border text-muted-foreground hover:border-gold/50",
                )}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{filtered.length} results</span>
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-gold" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent text-xs text-foreground focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-card text-foreground">{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LuxeSkeleton key={i} className="aspect-[3/4]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-4xl mb-3">✨</div>
            <h2 className="font-serif text-xl">No matches yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Try another filter or keyword.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}