/* Telegram Mini App SDK helpers — safe on SSR and outside Telegram. */

type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export function getTelegram(): any | null {
  if (typeof window === "undefined") return null;
  return (window as any).Telegram?.WebApp ?? null;
}

export function initTelegram() {
  const tg = getTelegram();
  if (!tg) return null;
  try {
    tg.ready?.();
    tg.expand?.();
    tg.setHeaderColor?.("#1a1410");
    tg.setBackgroundColor?.("#1a1410");
  } catch {
    // ignore
  }
  return tg;
}

export function getTelegramUser(): TgUser | null {
  const tg = getTelegram();
  const u = tg?.initDataUnsafe?.user;
  if (u) return u as TgUser;
  // Mock for local dev
  return {
    id: 1000001,
    first_name: "Aaliyah",
    last_name: "Rose",
    username: "aaliyah_luxe",
  };
}

export function hapticImpact(style: "light" | "medium" | "heavy" = "light") {
  const tg = getTelegram();
  try {
    tg?.HapticFeedback?.impactOccurred?.(style);
  } catch {
    // ignore
  }
}

export function hapticSelection() {
  try {
    getTelegram()?.HapticFeedback?.selectionChanged?.();
  } catch {
    // ignore
  }
}

export function showBackButton(onClick: () => void) {
  const tg = getTelegram();
  if (!tg?.BackButton) return () => {};
  tg.BackButton.show();
  tg.BackButton.onClick(onClick);
  return () => {
    try {
      tg.BackButton.offClick(onClick);
      tg.BackButton.hide();
    } catch {
      // ignore
    }
  };
}