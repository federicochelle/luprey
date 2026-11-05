import { CaseCard } from "@/components/CaseCard";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { casos } from "@/content/casos";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Trabajos",
  description: "Casos reales de marcas con las que trabajamos: contenido, catálogos, fotografía y más.",
  path: "/trabajos",
});

export default function TrabajosPage() {
  return (
    <>
      <PageHero
        id="trabajos-titulo"
        eyebrow="Trabajos"
        title="Marcas que se metieron con nosotros"
        intro="Algunos de los proyectos en los que nos pusimos la camiseta."
      />
      <Section tone="carbon" labelledBy="trabajos-lista">
        <h2 id="trabajos-lista" className="sr-only">
          Listado de trabajos
        </h2>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso) => (
            <li key={caso.slug}>
              <CaseCard caso={caso} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBanner id="trabajos-cta" tone="crema" />
    </>
  );
}
