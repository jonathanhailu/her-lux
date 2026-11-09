import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function PageHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 glass border-b border-border/40">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.history.back()}
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-serif text-lg">{title}</h1>
        <div className="w-10 flex justify-end">{right}</div>
      </div>
    </header>
  );
}

export function NotFoundLink() {
  return <Link to="/">Home</Link>;
}