import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Crown, Heart, LogOut, MapPin, Package, Settings, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTelegramUser } from "@/store/telegramUser";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Maison Luxe" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useTelegramUser((s) => s.user);
  const initials = (user?.first_name?.[0] ?? "L") + (user?.last_name?.[0] ?? "");

  return (
    <div>
      <PageHeader title="Account" />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 mt-4 rounded-3xl bg-gradient-to-br from-[#2a1f15] via-[#1a1410] to-[#0d0a08] border border-gold/30 p-6 shadow-luxe overflow-hidden relative"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl animate-float" />
        <div className="relative flex items-center gap-4">
          {user?.photo_url ? (
            <img src={user.photo_url} alt={user.first_name} className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/60" />
          ) : (
            <div className="h-16 w-16 rounded-full grid place-items-center bg-gradient-gold text-ink font-serif text-xl ring-2 ring-gold/60">
              {initials.toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.28em] uppercase text-gold/80">Telegram member</div>
            <h2 className="font-serif text-xl truncate">{user?.first_name} {user?.last_name}</h2>
            <div className="text-xs text-muted-foreground">@{user?.username ?? "guest"}</div>
          </div>
        </div>
        <div className="relative mt-5 flex items-center gap-2 rounded-2xl bg-black/30 px-4 py-3">
          <Crown className="h-4 w-4 text-gold" />
          <div className="flex-1">
            <div className="text-xs">VIP Loyalty</div>
            <div className="text-[10px] text-muted-foreground">1,240 points · Gold tier</div>
          </div>
          <Sparkles className="h-4 w-4 text-gold" />
        </div>
      </motion.section>

      <nav className="mx-5 mt-5 rounded-3xl bg-card border border-border overflow-hidden">
        {[
          { Icon: Package, label: "My Orders", to: "/orders" as const },
          { Icon: Heart, label: "Wishlist", to: "/wishlist" as const },
          { Icon: MapPin, label: "Addresses", to: "/profile" as const },
          { Icon: Settings, label: "Settings", to: "/profile" as const },
        ].map(({ Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-3 px-5 h-14 border-b border-border last:border-b-0 hover:bg-white/5 transition"
          >
            <Icon className="h-4 w-4 text-gold" />
            <span className="flex-1 text-sm">{label}</span>
            <span className="text-muted-foreground">›</span>
          </Link>
        ))}
      </nav>

      <div className="px-5 mt-6">
        <LuxeButton variant="ghost" fullWidth>
          <LogOut className="h-4 w-4 mr-1" /> Sign out
        </LuxeButton>
      </div>
    </div>
  );
}