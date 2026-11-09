import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/data/mockProducts";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { hapticImpact, hapticSelection } from "@/utils/telegram";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useWishlist();
  const add = useCart((s) => s.add);
  const saved = wishlist.has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block relative overflow-hidden rounded-3xl bg-card shadow-luxe"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-gold/95 px-3 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase text-ink">
              {product.badge}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              hapticSelection();
              wishlist.toggle(product.id);
            }}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass"
          >
            <Heart
              className={cn("h-4 w-4 transition", saved ? "fill-gold text-gold" : "text-foreground")}
            />
          </button>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1 text-[10px] text-gold/90 mb-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span>{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews})</span>
            </div>
            <h3 className="font-serif text-base leading-tight line-clamp-2">{product.title}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 p-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold">${product.price}</span>
              {product.oldPrice && (
                <span className="text-[11px] text-muted-foreground line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
              {product.subtitle}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              hapticImpact("light");
              add(product, {
                length: product.options.length[0],
                density: product.options.density[0],
                laceType: product.options.laceType[0],
                texture: product.options.texture[0],
              });
            }}
            aria-label="Quick add"
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold-glow"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}