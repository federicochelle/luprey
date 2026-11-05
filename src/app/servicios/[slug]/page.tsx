import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CtaBanner } from "@/components/CtaBanner";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Trazo } from "@/components/Trazo";
import { SplitSection } from "@/components/SplitSection";
import { casos, getCasosDestacados, getCasosPorServicio } from "@/content/casos";
import { getServicio, servicios } from "@/content/servicios";
import { home } from "@/content/home";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};
  return buildMetadata({
    title: servicio.titulo,
    description: servicio.descripcionCorta,
    path: `/servicios/${servicio.slug}`,
  });
}

export default async function ServicioPage({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  // El primer caso que incluya este servicio; solo si no hay ninguno, un caso destacado.
  const caso = getCasosPorServicio(servicio.slug)[0] ?? getCasosDestacados()[0] ?? casos[0];
  const serviciosCaso = caso ? caso.servicios.map(getServicio).filter((s) => s !== undefined) : [];

  return (
    <>
      <PageHero
        id="servicio-titulo"
        icon={<ServiceIcon icon={servicio.icon} size="lg" />}
        image={{ src: servicio.image }}
        title={servicio.titulo}
        intro={servicio.descripcionLarga}
      />

      {/* Qué incluye: ancho completo, ítems en grilla */}
      <Section tone="carbon" labelledBy="incluye-titulo" className="relative isolate overflow-hidden">
        <Trazo variant="espiral" position="top-right" />
        <SectionHeading id="incluye-titulo" title="Qué incluye" />
        <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicio.incluye.map((item) => (
            <li key={item} className="flex gap-4 border-b border-tone-line pb-5 text-lg">
              <span aria-hidden="true" className="font-bold text-oliva">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Un trabajo nuestro: el caso relacionado (o uno destacado si no hay) */}
      {caso && (
        <SplitSection
          reverse
          variant="crema"
          eyebrow={`Un trabajo nuestro · ${caso.rubro}`}
          title={caso.cliente}
          compactTitle
          image={caso.portada.src}
        >
          <div className="mt-6">
            <p className="text-tone-accent">{caso.resumen}</p>
            <p className="mt-2 text-tone-accent">Qué hicimos: {serviciosCaso.map((s) => s.titulo).join(" + ")}.</p>
            <Button href={`/trabajos/${caso.slug}`} className="mt-8">
              Ver trabajo
            </Button>
          </div>
        </SplitSection>
      )}

      <Section tone="carbon" labelledBy="faq-titulo">
        <SectionHeading id="faq-titulo" title="Preguntas frecuentes" />
        <Faq items={servicio.faqs} />
      </Section>

      <CtaBanner
        title={home.ctaGeneral.titulo}
        subtitle={home.ctaGeneral.bajada}
        image={servicio.image}
        variant="crema"
        defaultService={servicio.slug}
      />
    </>
  );
}
