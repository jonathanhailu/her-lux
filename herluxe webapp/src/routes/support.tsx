import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { LuxeButton } from "@/components/ui-luxe/LuxeButton";
import { TELEGRAM_SUPPORT_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — Maison Luxe" }] }),
  component: SupportPage,
});

const FAQ = [
  { q: "How long do your wigs last?", a: "With proper care, 2–5 years for HD lace and 5+ years for raw Vietnamese." },
  { q: "Do you ship worldwide?", a: "Yes — DHL Express to 60+ countries. Free over $300." },
  { q: "What's your return policy?", a: "30-day return on unopened items. Hygiene seal must be intact." },
  { q: "Can I customize my wig?", a: "Yes. Reach our stylists on Telegram for bespoke colour and density." },
];

function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHeader title="Support" />
      <div className="px-5 pt-4 space-y-6 pb-10">
        <motion.a
          href={TELEGRAM_SUPPORT_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-3xl bg-gradient-to-br from-[#2a1f15] to-[#0d0a08] border border-gold/30 p-5 shadow-luxe"
        >
          <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center text-ink">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-serif text-base">Chat on Telegram</div>
            <div className="text-xs text-muted-foreground">Avg reply in 5 min</div>
          </div>
          <span className="text-gold">→</span>
        </motion.a>

        <section>
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">FAQ</h2>
          <ul className="rounded-3xl bg-card border border-border overflow-hidden divide-y divide-border">
            {FAQ.map((f, i) => (
              <li key={i}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
                  <span className="text-sm">{f.q}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open === i && "rotate-180 text-gold")} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Send a message</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent", { description: "We'll reply on Telegram." }); }}
            className="rounded-3xl bg-card border border-border p-5 space-y-3"
          >
            <input className="w-full h-12 px-4 rounded-2xl bg-input border border-border text-sm focus:outline-none focus:border-gold/60" placeholder="Your email" type="email" required />
            <textarea className="w-full p-4 rounded-2xl bg-input border border-border text-sm focus:outline-none focus:border-gold/60 resize-none" placeholder="How can we help?" rows={4} required />
            <LuxeButton type="submit" variant="primary" fullWidth>Send</LuxeButton>
          </form>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-card border border-border p-4">
            <div className="text-[10px] tracking-[0.24em] uppercase text-gold">Shipping</div>
            <p className="mt-2 text-xs text-muted-foreground">DHL Express 3-7 days, tracked. Free over $300.</p>
          </div>
          <div className="rounded-3xl bg-card border border-border p-4">
            <div className="text-[10px] tracking-[0.24em] uppercase text-gold">Returns</div>
            <p className="mt-2 text-xs text-muted-foreground">30-day return on sealed items. Easy via Telegram.</p>
          </div>
        </section>
      </div>
    </div>
  );
}