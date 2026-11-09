import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Package } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { LuxeSkeleton } from "@/components/ui-luxe/Skeleton";
import { fetchOrders } from "@/services/orders";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — Maison Luxe" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { data, isLoading } = useQuery({ queryKey: ["orders"], queryFn: fetchOrders });

  return (
    <div>
      <PageHeader title="My Orders" />
      <div className="px-5 pt-4 space-y-3">
        {isLoading && [0, 1, 2].map((i) => <LuxeSkeleton key={i} className="h-32" />)}
        {data?.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl bg-card border border-border p-5 shadow-luxe"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">{o.date}</div>
                <div className="font-serif text-lg">{o.id}</div>
              </div>
              <span className="text-xs rounded-full bg-gold/15 text-gold px-3 py-1">{o.status}</span>
            </div>
            <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${o.tracking}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-gold"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{o.items} item · ${o.total}</span>
              <Link to="/shop" className="text-xs tracking-[0.22em] uppercase text-gold">Reorder →</Link>
            </div>
          </motion.div>
        ))}
        {data && data.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-10 w-10 mx-auto text-gold" />
            <h2 className="font-serif text-xl mt-3">No orders yet</h2>
            <p className="text-sm text-muted-foreground mt-1">Your luxe journey starts here.</p>
            <div className="mt-5"><Link to="/shop"><LuxeButton variant="primary">Start shopping</LuxeButton></Link></div>
          </div>
        )}
      </div>
    </div>
  );
}