import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/mockProducts";

export type CartItem = {
  key: string;
  product: Product;
  qty: number;
  options: { length?: string; density?: string; laceType?: string; texture?: string };
};

type CartState = {
  items: CartItem[];
  add: (product: Product, options: CartItem["options"], qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

const keyOf = (id: string, o: CartItem["options"]) =>
  `${id}::${o.length ?? "-"}::${o.density ?? "-"}::${o.laceType ?? "-"}::${o.texture ?? "-"}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, options, qty = 1) =>
        set((s) => {
          const key = keyOf(product.id, options);
          const existing = s.items.find((i) => i.key === key);
          if (existing) {
            return { items: s.items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)) };
          }
          return { items: [...s.items, { key, product, qty, options }] };
        }),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    { name: "luxe-cart" },
  ),
);