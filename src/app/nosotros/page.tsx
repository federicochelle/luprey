import Image from "next/image";
import { CtaBanner } from "@/components/CtaBanner";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SplitSection } from "@/components/SplitSection";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { nosotros } from "@/content/nosotros";
import { site, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Nosotros",
  description:
    "Conocé a Luprey, la agencia de marketing de Mercedes y Fray Bentos: cómo pensamos y quiénes estamos detrás de cada marca.",
  path: "/nosotros",
});

export default function NosotrosPage() {
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
        <SectionHeading id="equipo-titulo" title={equipo.titulo} />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-16">
          {equipo.integrantes.map((p) => {
            const contacto = site.contactos.find((c) => c.id === p.contacto);
            return (
              <li key={p.nombre}>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={p.imagen}
                    alt={`Ilustración de ${p.nombre}`}
                    fill
                    sizes="(min-width: 1152px) 544px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* Nombre y ciudad a la izquierda; el botón a la derecha (si no entra, pasa abajo a todo el ancho) */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
                  <div>
                    <h3 className="text-2xl font-bold uppercase">{p.nombre}</h3>
                    <p className="mt-1 text-tone-accent">{p.ciudad}</p>
                  </div>
                  {contacto && (
                    <a
                      href={whatsappUrl(contacto)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-tone-fg bg-tone-fg px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-tone-bg transition-colors hover:border-tone-accent hover:bg-tone-accent max-[380px]:w-full"
                    >
                      <WhatsAppIcon className="size-4" />
                      Escribir
                      <span className="sr-only"> a {p.nombre} por WhatsApp (se abre en una pestaña nueva)</span>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBanner title={cierre.titulo} subtitle={cierre.bajada} image={cierre.imagen} variant="carbon" />
    </>
  );
}
