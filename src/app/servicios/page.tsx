import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { servicios } from "@/content/servicios";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Servicios de marketing",
  description:
    "Redes sociales, diseño gráfico, contenido, fotografía y catálogos para marcas de Mercedes, Soriano y todo Uruguay.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        id="servicios-titulo"
        eyebrow="Servicios"
        title="Todo lo que tu marca necesita"
        intro="Elegí un servicio o combinalos: armamos la propuesta a la medida de tu negocio."
      />
      <Section tone="carbon" labelledBy="servicios-lista">
        <h2 id="servicios-lista" className="sr-only">
          Listado de servicios
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard servicio={s} index={i} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBanner id="servicios-cta" tone="crema" />
    </>
  );
}
