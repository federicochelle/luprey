import Image from "next/image";
import Link from "next/link";
import type { Caso } from "@/content/casos";

export function CaseCard({ caso }: { caso: Caso }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-tone-line transition-colors hover:border-tone-fg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={caso.portada.src}
          alt={caso.portada.alt}
          fill
          sizes="(min-width: 1152px) 368px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">{caso.rubro}</p>
        <h3 className="mt-2 text-2xl font-bold uppercase">
          <Link href={`/trabajos/${caso.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {caso.cliente}
          </Link>
        </h3>
        <p className="mt-3 text-tone-accent">{caso.titulo}</p>
      </div>
    </article>
  );
}
