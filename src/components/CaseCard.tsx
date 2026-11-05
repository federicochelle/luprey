import Image from "next/image";
import Link from "next/link";
import type { Caso } from "@/content/casos";

export function CaseCard({ caso }: { caso: Caso }) {
  const portada = caso.imagenes[0];
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={portada.src}
          alt={portada.alt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">{caso.rubro}</p>
      <h3 className="mt-2 text-2xl font-bold uppercase">
        <Link href={`/trabajos/${caso.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {caso.cliente}
        </Link>
      </h3>
      <p className="mt-3 text-tone-accent">Qué hicimos: {caso.queSeHizo.join(" + ")}.</p>
    </article>
  );
}
