import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { useCart } from "@/store/cart";
import { hapticImpact, hapticSelection } from "@/utils/telegram";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Maison Luxe" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const sub = subtotal();
  const shipping = sub > 0 ? 0 : 0;
  const total = Math.max(0, sub - discount + shipping);

  const applyCode = () => {
    if (code.toUpperCase() === "LUXE15") {
      setDiscount(sub * 0.15);
      toast.success("VIP code applied", { description: "15% off your bag" });
      hapticImpact("medium");
    } else {
      toast.error("Invalid code", { description: "Try LUXE15" });
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title="Your Bag" />
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-24 text-center">
          <div className="mx-auto h-20 w-20 rounded-full grid place-items-center bg-card border border-border mb-4">
            <ShoppingBag className="h-8 w-8 text-gold" />
          </div>
          <h2 className="font-serif text-2xl">Your bag is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Discover your next favourite wig.</p>
          <div className="mt-6 inline-block">
            <Link to="/shop">
              <LuxeButton variant="primary">Browse Collection</LuxeButton>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={`Your Bag · ${items.length}`} />
      <ul className="px-5 pt-4 space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex gap-3 rounded-3xl bg-card border border-border p-3 shadow-luxe"
            >
              <img src={item.product.images[0]} alt={item.product.title} className="h-24 w-20 object-cover rounded-2xl" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <h3 className="font-serif text-sm leading-tight line-clamp-2">{item.product.title}</h3>
                  <button
                    onClick={() => { hapticSelection(); remove(item.key); }}
                    aria-label="Remove"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.options.length && <span>{item.options.length}</span>}
                  {item.options.density && <span>{item.options.density}</span>}
                  {item.options.texture && <span>{item.options.texture}</span>}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => { hapticSelection(); setQty(item.key, item.qty - 1); }}
                      className="h-8 w-8 grid place-items-center"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => { hapticSelection(); setQty(item.key, item.qty + 1); }}
                      className="h-8 w-8 grid place-items-center"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-sm font-semibold">${(item.product.price * item.qty).toFixed(0)}</div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="px-5 mt-6 space-y-4">
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Promo code"
            className="flex-1 h-12 px-4 rounded-full bg-card border border-border text-sm focus:outline-none focus:border-gold/60"
          />
          <LuxeButton variant="outline" onClick={applyCode}>Apply</LuxeButton>
        </div>

        <div className="rounded-3xl bg-card border border-border p-5 space-y-2 text-sm">
          <Row label="Subtotal" value={`$${sub.toFixed(0)}`} />
          {discount > 0 && <Row label="Discount" value={`-$${discount.toFixed(0)}`} accent />}
          <Row label="Shipping" value="Free" />
          <div className="h-px bg-border my-2" />
          <Row label="Total" value={`$${total.toFixed(0)}`} bold />
        </div>

        <Link to="/checkout">
          <LuxeButton variant="primary" fullWidth size="lg" onClick={() => hapticImpact("medium")}>
            Checkout · ${total.toFixed(0)}
          </LuxeButton>
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={[bold ? "text-lg font-semibold" : "", accent ? "text-gold" : ""].join(" ")}>{value}</span>
    </div>
  );
}