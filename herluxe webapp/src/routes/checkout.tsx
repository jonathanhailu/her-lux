import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { useCart } from "@/store/cart";
import { hapticImpact } from "@/utils/telegram";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Maison Luxe" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const total = subtotal();
  const [submitting, setSubmitting] = useState(false);

  const onPay = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    hapticImpact("heavy");
    setTimeout(() => {
      toast.success("Order placed!", { description: "Redirecting to Chapa…" });
      clear();
      router.navigate({ to: "/orders" });
    }, 1100);
  };

  return (
    <div>
      <PageHeader title="Checkout" />
      <form onSubmit={onPay} className="px-5 pt-4 space-y-6 pb-40">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-card border border-border p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-gold" />
            <h2 className="font-serif text-lg">Shipping</h2>
          </div>
          <div className="space-y-3">
            <Input label="Full name" placeholder="Aaliyah Rose" required />
            <Input label="Phone" placeholder="+251…" required />
            <Input label="Address" placeholder="Bole, Addis Ababa" required />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" placeholder="Addis Ababa" required />
              <Input label="Postal" placeholder="1000" />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl bg-card border border-border p-5"
        >
          <h2 className="font-serif text-lg mb-4">Order summary</h2>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.key} className="flex items-center gap-3 text-sm">
                <img src={i.product.images[0]} alt={i.product.title} className="h-12 w-10 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <div className="line-clamp-1 font-serif">{i.product.title}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {i.options.length} · {i.options.texture} · ×{i.qty}
                  </div>
                </div>
                <div className="font-semibold">${i.product.price * i.qty}</div>
              </li>
            ))}
            {items.length === 0 && (
              <li className="text-sm text-muted-foreground text-center py-4">Your bag is empty.</li>
            )}
          </ul>
          <div className="h-px bg-border my-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-semibold">${total.toFixed(0)}</span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="rounded-3xl bg-gradient-to-br from-[#2a1f15] to-[#0d0a08] border border-gold/30 p-5"
        >
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gold" />
            <h2 className="font-serif text-lg">Payment</h2>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            You'll be redirected to <span className="text-gold">Chapa</span> to complete payment securely.
          </p>
        </motion.section>

        <div className="fixed bottom-[88px] inset-x-0 z-30 px-3">
          <div className="mx-auto max-w-md">
            <LuxeButton type="submit" variant="primary" fullWidth size="lg" disabled={submitting || items.length === 0}>
              {submitting ? "Processing…" : `Pay with Chapa · $${total.toFixed(0)}`}
            </LuxeButton>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-1.5">{label}</span>
      <input
        {...rest}
        className="w-full h-12 px-4 rounded-2xl bg-input border border-border text-sm focus:outline-none focus:border-gold/60 transition"
      />
    </label>
  );
}