import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/store/wishlist";
import { fetchProducts } from "@/services/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Maison Luxe" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div>
      <PageHeader title="Saved" />
      {saved.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-24 text-center">
          <div className="mx-auto h-20 w-20 rounded-full grid place-items-center bg-card border border-border mb-4">
            <Heart className="h-8 w-8 text-gold" />
          </div>
          <h2 className="font-serif text-2xl">Nothing saved yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Tap the heart on anything you love.</p>
          <div className="mt-6 inline-block">
            <Link to="/shop"><LuxeButton variant="primary">Explore drops</LuxeButton></Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          {saved.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}