import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  variant?: "solid" | "outline";
  /** Abre en pestaña nueva (WhatsApp, Instagram, etc.) */
  external?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-full border-2 px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors";
const variants = {
  solid: "border-tone-fg bg-tone-fg text-tone-bg hover:border-tone-accent hover:bg-tone-accent",
  outline: "border-tone-fg text-tone-fg hover:bg-tone-fg hover:text-tone-bg",
};

export function Button({ href, variant = "solid", external, className, children }: Props) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
