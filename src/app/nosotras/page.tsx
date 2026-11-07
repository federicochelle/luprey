import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { nosotros } from "@/content/nosotros";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Nosotras",
  description:
    "Conocé a Luprey, la agencia de marketing: cómo pensamos y quiénes estamos detrás de cada marca.",
  path: "/nosotras",
});

export default function NosotrasPage() {
  const { queEs, pensamos, equipo, cierre } = nosotros;

  return (
    <>
      {/* La página arranca acá: lleva el h1 y un poco de aire arriba para no quedar pegada al header */}
      <SplitSection
        as="h1"
        reparto="mitad"
        reverse
        variant="carbon"
        title={queEs.titulo}
        text={queEs.texto}
        image={queEs.imagen}
        className="pt-8 lg:pt-12"
        trazo={{ variant: "lazo", position: "top-right" }}
      />

      {/* Cómo pensamos: alterna el lado de la imagen y el fondo (crema / carbón) */}
      {pensamos.map((b, i) => (
        <SplitSection
          key={b.titulo}
          reparto="mitad"
          reverse={i % 2 === 1}
          variant={i % 2 === 0 ? "crema" : "carbon"}
          title={b.titulo}
          text={b.texto}
          image={b.imagen}
          trazo={i === 1 ? { variant: "hilo", position: "bottom-right" } : undefined}
        />
      ))}

      <Section tone="crema" labelledBy="equipo-titulo">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mobile: foto 4:5 arriba del texto. Desktop: ocupa el alto de la columna de texto (items-stretch) */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full">
            <Image
              src={equipo.imagen}
              alt={equipo.alt}
              fill
              sizes="(min-width: 1152px) 544px, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div>
            <SectionHeading id="equipo-titulo" title={equipo.titulo} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed">
              {equipo.parrafos.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <p className="mt-10 text-2xl font-bold uppercase leading-[1.15] tracking-tight text-tone-accent text-balance sm:text-3xl">
              {equipo.cierre}
            </p>
          </div>
        </div>
      </Section>

      <CtaBanner title={cierre.titulo} subtitle={cierre.bajada} image={cierre.imagen} variant="carbon" />
    </>
  );
}
