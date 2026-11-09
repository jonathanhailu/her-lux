export const APP_NAME = "MAISON LUXE";
export const APP_TAGLINE = "Luxury Hair, Effortless Beauty";
export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "https://api.example.com";
export const TELEGRAM_SUPPORT_URL = "https://t.me/maisonluxe_support";

export const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "Home" },
  { to: "/shop", label: "Shop", icon: "Sparkles" },
  { to: "/cart", label: "Cart", icon: "ShoppingBag" },
  { to: "/wishlist", label: "Saved", icon: "Heart" },
  { to: "/profile", label: "You", icon: "User" },
] as const;

export const CATEGORIES = [
  { id: "hd-lace", name: "HD Lace Wigs", emoji: "✨" },
  { id: "raw", name: "Raw Hair", emoji: "🌿" },
  { id: "curly", name: "Curly", emoji: "🌀" },
  { id: "glueless", name: "Glueless", emoji: "💎" },
  { id: "bundles", name: "Bundles", emoji: "🎀" },
  { id: "frontals", name: "Frontals", emoji: "👑" },
] as const;