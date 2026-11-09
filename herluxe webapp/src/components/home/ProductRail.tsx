import type { Product } from "@/data/mockProducts";
import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import { hapticSelection } from "@/utils/telegram";

export function ProductRail({ products }: { products: Product[] }) {
  const wishlist = useWishlist();
  return (
    <div className="overflow-x-auto no-scrollbar -mx-1 px-4">
      <ul className="flex gap-3 pb-2">
        {products.map((p) => {
          const saved = wishlist.has(p.id);
          return (
            <li key={p.id} className="w-[210px] shrink-0">
              <Link
                to="/products/$id"
                params={{ id: p.id }}
                className="block relative overflow-hidden rounded-3xl bg-card shadow-luxe"
              >
                <div className="relative aspect-[3/4]">
                  <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); hapticSelection(); wishlist.toggle(p.id); }}
                    aria-label="Save"
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full glass"
                  >
                    <Heart className={cn("h-3.5 w-3.5", saved ? "fill-gold text-gold" : "")} />
                  </button>
                  {p.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-gold/95 px-2 py-0.5 text-[8px] font-semibold tracking-[0.18em] uppercase text-ink">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 text-[10px] text-gold mb-1">
                    <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating}
                  </div>
                  <h3 className="font-serif text-sm line-clamp-1">{p.title}</h3>
                  <div className="mt-1 text-sm font-semibold">${p.price}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}