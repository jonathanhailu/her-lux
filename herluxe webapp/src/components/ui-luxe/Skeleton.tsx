import { cn } from "@/lib/utils";

export function LuxeSkeleton({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-2xl", className)} />;
}