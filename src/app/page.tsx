import { Button } from "@/components/Button";
import { CaseCard } from "@/components/CaseCard";
import { ClientLogos } from "@/components/ClientLogos";
import { CtaBanner } from "@/components/CtaBanner";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getCasosDestacados } from "@/content/casos";
import { servicios } from "@/content/servicios";
import { site, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `${site.nombre} | Agencia de marketing en Mercedes, Soriano`,
  description: site.descripcion,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const destacados = getCasosDestacados();

  return (
    <>
      <Section tone="crema" labelledBy="hero-titulo" className="pb-16 pt-16 sm:pt-28">
        <SectionHeading
          as="h1"
          id="hero-titulo"
          title="Nos metemos en tu marca como si fuera nuestra."
          intro={site.tagline}
          className="max-w-4xl"
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={whatsappUrl()} external>
            Hablemos por WhatsApp
          </Button>
          <Button href="/trabajos" variant="outline">
            Ver trabajos
          </Button>
        </div>
        <ClientLogos />
      </Section>

      <Section tone="carbon" labelledBy="servicios-titulo">
        <SectionHeading
          id="servicios-titulo"
          eyebrow="Servicios"
          title="Lo que hacemos por tu marca"
          intro="Todo lo que necesitás para comunicar mejor, en un solo lugar."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard servicio={s} index={i} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="crema" labelledBy="casos-titulo">
        <SectionHeading
          id="casos-titulo"
          eyebrow="Trabajos"
          title="Casos destacados"
          intro="Marcas reales con las que nos metimos de lleno."
        />
        <ul className="mt-14 grid gap-10 sm:grid-cols-2">
          {destacados.map((caso) => (
            <li key={caso.slug}>
              <CaseCard caso={caso} />
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href="/trabajos" variant="outline">
            Ver todos los trabajos
          </Button>
        </div>
      </Section>

      <Section tone="carbon" labelledBy="proceso-titulo">
        <SectionHeading
          id="proceso-titulo"
          eyebrow="Proceso"
          title="Cómo trabajamos"
          intro="Cuatro pasos simples, siempre con vos al lado."
        />
        <ProcessSteps />
      </Section>

      <CtaBanner id="cta-titulo" tone="crema" />
    </>
  );
}
