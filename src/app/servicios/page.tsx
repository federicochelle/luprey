import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { servicios } from "@/content/servicios";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Servicios de marketing",
  description:
    "Redes sociales, diseño gráfico, contenido, fotografía y catálogos para marcas de Mercedes, Fray Bentos y todo Uruguay.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        id="servicios-titulo"
        tone="carbon"
        title="Todo lo que tu marca necesita"
        intro="Si tu marca no está creciendo, algo está pasando. Y probablemente ya lo sentís."
      />
      {/* Mismo fondo que el hero: sin padding superior para no duplicar el espacio entre ambos */}
      <Section tone="carbon" labelledBy="servicios-lista" className="pt-0 sm:pt-0">
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
      <CtaBanner title="No lo dejes para más adelante. Escribinos." image="/images/hero/hero.jpg" variant="crema" />
    </>
  );
}
