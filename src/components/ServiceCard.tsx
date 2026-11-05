import Link from "next/link";
import type { Servicio } from "@/content/servicios";

export function ServiceCard({ servicio, index }: { servicio: Servicio; index: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-tone-line p-6 transition-colors hover:border-tone-fg sm:p-8">
      <span className="text-sm font-bold text-tone-accent" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-6 text-2xl font-bold uppercase">
        {/* El ::after extiende el área clickeable a toda la tarjeta */}
        <Link href={`/servicios/${servicio.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {servicio.titulo}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-tone-accent">{servicio.descripcionCorta}</p>
      <p className="mt-6 text-sm font-bold uppercase tracking-wide" aria-hidden="true">
        Ver más <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </article>
  );
}
