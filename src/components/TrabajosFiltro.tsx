"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Item = { slug: string; servicios: string[]; node: ReactNode };

/**
 * Filtros por servicio (botones con aria-pressed). Filtra del lado del cliente, sin recargar.
 * La página llega prerenderizada con todos los trabajos; las tarjetas se arman en el servidor y entran como `node`.
 */
export function TrabajosFiltro({ filtros, items }: { filtros: { slug: string; titulo: string }[]; items: Item[] }) {
  const [filtro, setFiltro] = useState("todos");
  const visibles = filtro === "todos" ? items : items.filter((i) => i.servicios.includes(filtro));

  const opciones = [{ slug: "todos", titulo: "Todos" }, ...filtros];

  return (
    <>
      <div role="group" aria-label="Filtrar trabajos por servicio" className="flex flex-wrap gap-3">
        {opciones.map((o) => {
          const activo = filtro === o.slug;
          return (
            <button
              key={o.slug}
              type="button"
              aria-pressed={activo}
              onClick={() => setFiltro(o.slug)}
              className={cn(
                "rounded-full border-2 border-tone-fg px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors",
                activo ? "bg-tone-fg text-tone-bg" : "hover:bg-tone-fg/10",
              )}
            >
              {o.titulo}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visibles.length === 1 ? "1 trabajo" : `${visibles.length} trabajos`}
      </p>

      {visibles.length > 0 ? (
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-tone-accent">Todavía no hay trabajos de este servicio.</p>
      )}
    </>
  );
}
