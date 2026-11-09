import { Crown } from "lucide-react";
import { motion } from "motion/react";
import { TELEGRAM_SUPPORT_URL } from "@/constants";

export function VipBanner() {
  return (
    <motion.a
      href={TELEGRAM_SUPPORT_URL}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mx-5 block overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#2a1f15] via-[#1a1410] to-[#0d0a08] p-6 shadow-luxe"
    >
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10 blur-3xl animate-float" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-gold">
          <Crown className="h-3 w-3" /> Telegram VIP
        </div>
        <h3 className="mt-3 font-serif text-2xl">Join the inner circle.</h3>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-[20rem]">
          Early drops, private restocks and 15% off your first VIP order.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-gold">
          Open Channel →
        </div>
      </div>
    </motion.a>
  );
}