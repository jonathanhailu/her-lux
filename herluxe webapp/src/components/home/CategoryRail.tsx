import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/constants";
import { motion } from "motion/react";

export function CategoryRail() {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-1 px-4">
      <ul className="flex gap-2.5 pb-1">
        {CATEGORIES.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-card/80 border border-border px-4 h-10 text-xs whitespace-nowrap hover:border-gold/50 transition"
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}