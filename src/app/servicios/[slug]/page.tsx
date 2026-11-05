import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CaseCard } from "@/components/CaseCard";
import { CtaBanner } from "@/components/CtaBanner";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { casos, getCasosPorServicio } from "@/content/casos";
import { getServicio, servicios } from "@/content/servicios";
import { whatsappUrl } from "@/content/site";
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

  // Si ningún caso usa este servicio, mostramos igual un trabajo de la agencia.
  const relacionados = getCasosPorServicio(servicio.slug);
  const caso = relacionados[0] ?? casos[0];

  return (
    <>
      <PageHero id="servicio-titulo" eyebrow="Servicio" title={servicio.titulo} intro={servicio.descripcionLarga}>
        <Button href={whatsappUrl(`Hola Luprey! Quiero consultar por ${servicio.titulo}.`)} external>
          Consultar por WhatsApp
        </Button>
        <Button href="/servicios" variant="outline">
          Ver todos los servicios
        </Button>
      </PageHero>

      <Section tone="carbon" labelledBy="incluye-titulo">
        <SectionHeading id="incluye-titulo" title="Qué incluye" />
        <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {servicio.incluye.map((item) => (
            <li key={item} className="flex gap-4 border-t border-tone-line pt-5">
              <span aria-hidden="true" className="font-bold">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="crema" labelledBy="para-quien-titulo">
        <SectionHeading id="para-quien-titulo" title="Para quién es" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {servicio.paraQuien.map((item) => (
            <li key={item} className="rounded-2xl border border-tone-line p-6">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {caso && (
        <Section tone="carbon" labelledBy="caso-titulo">
          <SectionHeading
            id="caso-titulo"
            title={relacionados.length > 0 ? "Un caso relacionado" : "Un trabajo nuestro"}
          />
          <div className="mt-12 max-w-xl">
            <CaseCard caso={caso} />
          </div>
        </Section>
      )}

      <Section tone="crema" labelledBy="faq-titulo">
        <SectionHeading id="faq-titulo" title="Preguntas frecuentes" />
        <Faq items={servicio.faqs} />
      </Section>

      <CtaBanner id="servicio-cta" tone="carbon" buttonLabel="Hablemos por WhatsApp" />
    </>
  );
}
