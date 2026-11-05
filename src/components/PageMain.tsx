"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { esProduccion, tieneHeaderTransparente } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Contenido principal. Debajo del header fijo deja el espacio de su alto, salvo en las páginas con
 * header transparente (ver `headerTransparente` en site.ts): ahí el hero arranca desde arriba de todo.
 */
export function PageMain({ children }: { children: ReactNode }) {
  const transparente = tieneHeaderTransparente(usePathname());
  return (
    <main id="contenido" className={cn("flex-1", !transparente && (esProduccion ? "pt-16 sm:pt-20" : "pt-24 sm:pt-28"))}>
      {children}
    </main>
  );
}
