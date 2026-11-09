import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Heart, Share2, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { fetchProduct, fetchProducts } from "@/services/products";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { hapticImpact, hapticSelection } from "@/utils/telegram";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { LuxeSkeleton } from "@/components/ui-luxe/Skeleton";
import { ProductRail } from "@/components/home/ProductRail";
import { SectionHeading } from "@/components/ui-luxe/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
  const { data: all = [] } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const wishlist = useWishlist();
  const add = useCart((s) => s.add);

  const [imgIdx, setImgIdx] = useState(0);
  const [length, setLength] = useState<string | undefined>();
  const [density, setDensity] = useState<string | undefined>();
  const [laceType, setLaceType] = useState<string | undefined>();
  const [texture, setTexture] = useState<string | undefined>();

  if (isLoading || !product) {
    return (
      <div className="p-5 space-y-4">
        <LuxeSkeleton className="aspect-[3/4]" />
        <LuxeSkeleton className="h-6 w-2/3" />
        <LuxeSkeleton className="h-4 w-1/3" />
      </div>
    );
  }

  const saved = wishlist.has(product.id);

  const handleAdd = (buyNow = false) => {
    hapticImpact("medium");
    add(product, {
      length: length ?? product.options.length[0],
      density: density ?? product.options.density[0],
      laceType: laceType ?? product.options.laceType[0],
      texture: texture ?? product.options.texture[0],
    });
    if (buyNow) {
      router.navigate({ to: "/checkout" });
    } else {
      toast.success("Added to your bag", { description: product.title });
    }
  };

  const related = all.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 6);

  return (
    <div className="pb-32">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={product.images[imgIdx]}
            alt={product.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full aspect-[3/4] object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-[max(env(safe-area-inset-top),0.75rem)]">
          <button
            onClick={() => router.history.back()}
            className="grid h-10 w-10 place-items-center rounded-full glass"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => { hapticSelection(); wishlist.toggle(product.id); }}
              className="grid h-10 w-10 place-items-center rounded-full glass"
              aria-label="Save"
            >
              <Heart className={cn("h-4 w-4", saved && "fill-gold text-gold")} />
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-full glass" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              aria-label={`Image ${i + 1}`}
              className={cn("h-1.5 rounded-full transition-all", imgIdx === i ? "w-6 bg-gold" : "w-1.5 bg-white/40")}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-gold/15 text-gold px-2.5 py-1 text-[10px] tracking-[0.22em] uppercase mb-2">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-3xl leading-tight">{product.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
              )}
            </div>
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-gold">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {product.rating}
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <OptionGroup label="Length" options={product.options.length} value={length ?? product.options.length[0]} onChange={setLength} />
        <OptionGroup label="Density" options={product.options.density} value={density ?? product.options.density[0]} onChange={setDensity} />
        <OptionGroup label="Lace" options={product.options.laceType} value={laceType ?? product.options.laceType[0]} onChange={setLaceType} />
        <OptionGroup label="Texture" options={product.options.texture} value={texture ?? product.options.texture[0]} onChange={setTexture} />

        <div className="grid grid-cols-3 gap-2">
          {[
            { Icon: Truck, label: "Free express" },
            { Icon: ShieldCheck, label: "5y warranty" },
            { Icon: RotateCcw, label: "30d returns" },
          ].map(({ Icon, label }) => (
            <div key={label} className="rounded-2xl bg-card border border-border p-3 text-center">
              <Icon className="h-4 w-4 mx-auto text-gold" />
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>

        {related.length > 0 && (
          <div className="-mx-5">
            <SectionHeading eyebrow="You might love" title="Related drops" />
            <ProductRail products={related} />
          </div>
        )}
      </div>

      <div className="fixed bottom-[88px] inset-x-0 z-30 px-3">
        <div className="mx-auto max-w-md glass rounded-full border border-gold/30 shadow-luxe p-2 flex gap-2">
          <LuxeButton variant="ghost" size="md" className="flex-1" onClick={() => handleAdd(false)}>
            Add to Bag
          </LuxeButton>
          <LuxeButton variant="primary" size="md" className="flex-1" onClick={() => handleAdd(true)}>
            Buy Now
          </LuxeButton>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">{label}</span>
        <span className="text-xs text-gold">{value}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => { hapticSelection(); onChange(o); }}
            className={cn(
              "h-10 px-4 rounded-full text-xs border transition",
              value === o
                ? "bg-gold text-ink border-gold shadow-gold-glow"
                : "border-border bg-card text-foreground hover:border-gold/50",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function _Link() { return <Link to="/" />; }