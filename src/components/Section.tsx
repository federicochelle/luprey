import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  tone?: "crema" | "carbon";
  /** id del título de la sección, para aria-labelledby */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "crema", labelledBy, className, children }: Props) {
  return (
    <section data-tone={tone} aria-labelledby={labelledBy} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
