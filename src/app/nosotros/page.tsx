import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { nosotros } from "@/content/nosotros";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Nosotros",
  description: "Conocé a Luprey, la agencia de marketing de Mercedes, Soriano: nuestra historia, cómo trabajamos y quiénes somos.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  const { historia, formaDeTrabajar, equipo } = nosotros;
  return (
    <>
      <PageHero id="nosotros-titulo" eyebrow="Nosotros" title={historia.titulo} />

      <Section tone="crema" labelledBy="historia-titulo" className="pt-0 sm:pt-0">
        <h2 id="historia-titulo" className="sr-only">
          Nuestra historia
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed">
          {historia.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section tone="carbon" labelledBy="forma-titulo">
        <SectionHeading id="forma-titulo" title={formaDeTrabajar.titulo} />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {formaDeTrabajar.valores.map((v) => (
            <li key={v.titulo} className="border-t-2 border-tone-fg pt-6">
              <h3 className="text-2xl font-bold uppercase">{v.titulo}</h3>
              <p className="mt-3 text-tone-accent">{v.descripcion}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="crema" labelledBy="equipo-titulo">
        <SectionHeading id="equipo-titulo" title={equipo.titulo} />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.integrantes.map((p, i) => (
            <li key={`${p.nombre}-${i}`}>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={p.imagen}
                  alt={`Foto de ${p.nombre}`}
                  fill
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold uppercase">{p.nombre}</h3>
              <p className="text-tone-accent">{p.rol}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner id="nosotros-cta" tone="carbon" />
    </>
  );
}
