import { Star } from "lucide-react";
import { REVIEWS } from "@/data/mockProducts";
import { motion } from "motion/react";

export function ReviewRail() {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-1 px-4">
      <ul className="flex gap-3 pb-2">
        {REVIEWS.map((r, i) => (
          <motion.li
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06 }}
            className="w-[260px] shrink-0 rounded-3xl bg-card border border-border p-5 shadow-luxe"
          >
            <div className="flex gap-1 text-gold mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="h-3 w-3 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm leading-relaxed">"{r.text}"</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-gold grid place-items-center text-ink font-serif text-sm">
                {r.name[0]}
              </div>
              <div>
                <div className="text-xs font-medium">{r.name}</div>
                <div className="text-[10px] text-muted-foreground">{r.handle}</div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}