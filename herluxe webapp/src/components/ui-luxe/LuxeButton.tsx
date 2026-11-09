import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline" | "dark";

type Props = HTMLMotionProps<"button"> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-gold text-ink shadow-gold-glow hover:brightness-105 active:brightness-95",
  ghost: "bg-white/5 text-foreground hover:bg-white/10",
  outline: "border border-gold/60 text-gold hover:bg-gold/10",
  dark: "bg-ink text-foreground border border-border hover:bg-ink/80",
};

const sizes = {
  sm: "h-10 px-4 text-xs tracking-[0.18em] uppercase",
  md: "h-12 px-6 text-[11px] tracking-[0.22em] uppercase",
  lg: "h-14 px-8 text-xs tracking-[0.28em] uppercase",
};

export const LuxeButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", fullWidth, children, ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors select-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);
LuxeButton.displayName = "LuxeButton";