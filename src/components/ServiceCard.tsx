import Image from "next/image";
import Link from "next/link";
import type { Servicio } from "@/content/servicios";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ servicio, index }: { servicio: Servicio; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-tone-line transition-colors hover:border-tone-fg">
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Decorativa: el título de la tarjeta ya describe el servicio */}
        <Image
          src={servicio.image}
          alt=""
          fill
          sizes="(min-width: 1152px) 368px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <ServiceIcon icon={servicio.icon} />
          <span className="text-sm font-bold text-tone-accent" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
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
      </div>
    </article>
  );
}
