import { Button } from "@/components/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/Container";
import { HeroBackground } from "@/components/HeroBackground";
import { CaseCard } from "@/components/CaseCard";
import { ClientLogos } from "@/components/ClientLogos";
import { CtaBanner } from "@/components/CtaBanner";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/Section";
import { Trazo } from "@/components/Trazo";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { getCasosDestacados } from "@/content/casos";
import { servicios } from "@/content/servicios";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `${site.nombre} | Agencia de marketing en Mercedes y Fray Bentos`,
  description: site.descripcion,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  const destacados = getCasosDestacados();

  return (
    <>
      <section
        data-tone="carbon"
        aria-labelledby="hero-titulo"
        // Alto = viewport (svh: la parte visible aunque haya barras del navegador en mobile). Subtítulo casi en crema pleno: contraste AA
        className="relative isolate flex min-h-svh items-center overflow-hidden [--tone-accent:rgb(252_250_238/0.92)]"
      >
        <HeroBackground images={home.heroImages} />
        {/* Entre el fondo (z-0) y el contenido (z-10) */}
        <Trazo variant="gancho" position="top-left" zClass="z-[5]" mobile="chico" />
        {/* Más padding arriba que abajo: baja el contenido respecto del centro del hero */}
        <Container className="relative z-10 pb-16 pt-32 sm:pb-20 sm:pt-52">
          <SectionHeading as="h1" id="hero-titulo" title={home.hero.titulo} intro={home.hero.subtitulo} />
          <div className="mt-10 flex flex-wrap gap-4">
            <WhatsAppButton>Hablemos por WhatsApp</WhatsAppButton>
            <Button href="/trabajos" variant="outline">
              Ver trabajos
            </Button>
          </div>
        </Container>
      </section>

      <Section tone="carbon" labelledBy="servicios-titulo">
        <SectionHeading
          id="servicios-titulo"
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
          title={home.casos.titulo}
          intro={home.casos.bajada}
        />
        <div className="mt-12">
          <ClientLogos />
        </div>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section tone="carbon" labelledBy="proceso-titulo" className="grain">
        <SectionHeading
          id="proceso-titulo"
          title={home.proceso.titulo}
          intro={home.proceso.bajada}
        />
        <ProcessSteps />
      </Section>

      <CtaBanner
        title={home.cta.titulo}
        image="/images/hero/hero-2.jpg"
        variant="crema"
        trazo={{ variant: "ola", position: "bottom-left" }}
      />
    </>
  );
}
