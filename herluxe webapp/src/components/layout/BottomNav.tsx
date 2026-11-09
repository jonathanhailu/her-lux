import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, ShoppingBag, Heart, User } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import { hapticSelection } from "@/utils/telegram";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/shop", label: "Shop", Icon: Sparkles },
  { to: "/cart", label: "Cart", Icon: ShoppingBag },
  { to: "/wishlist", label: "Saved", Icon: Heart },
  { to: "/profile", label: "You", Icon: User },
] as const;

export function BottomNav() {
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 px-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-md rounded-full glass border border-gold/20 shadow-luxe px-2 py-2">
        <ul className="flex items-center justify-between">
          {items.map(({ to, label, Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            const badge = to === "/cart" ? cartCount : to === "/wishlist" ? wishCount : 0;
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  onClick={() => hapticSelection()}
                  className="relative flex flex-col items-center gap-0.5 py-1.5"
                  aria-label={label}
                >
                  <span className={cn("relative grid h-9 w-9 place-items-center rounded-full transition", active && "bg-gradient-gold text-ink shadow-gold-glow")}>
                    <Icon className={cn("h-[18px] w-[18px]", !active && "text-muted-foreground")} />
                    {badge > 0 && (
                      <span className="absolute -top-1 -right-1 grid min-w-4 h-4 px-1 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className={cn("text-[9px] tracking-[0.15em] uppercase", active ? "text-gold" : "text-muted-foreground")}>{label}</span>
                  {active && (
                    <motion.span layoutId="navdot" className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}