import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { APP_NAME } from "@/constants";
import { useTelegramUser } from "@/store/telegramUser";

export function TopBar() {
  const user = useTelegramUser((s) => s.user);
  const path = useRouterState({ select: (s) => s.location.pathname });
  // Show only on home page; route headers handle inner pages
  if (path !== "/") return null;
  return (
    <header className="sticky top-0 z-30 px-5 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 glass border-b border-border/40">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold/80">{APP_NAME}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Hey {user?.first_name ?? "Beautiful"} ✨
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/shop" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
            <Search className="h-4 w-4" />
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}