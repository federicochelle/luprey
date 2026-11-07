import { CaseCard } from "@/components/CaseCard";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { TrabajosFiltro } from "@/components/TrabajosFiltro";
import { casos } from "@/content/casos";
import { home } from "@/content/home";
import { servicios } from "@/content/servicios";
import { notFound } from "next/navigation";
import { SHOW_TRABAJOS } from "@/lib/config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Trabajos",
  description: "Casos reales de marcas con las que trabajamos: contenido, diseño gráfico, fotografía y más.",
  path: "/trabajos",
});

export default function TrabajosPage() {
  if (!SHOW_TRABAJOS) notFound();

  // Solo se ofrecen filtros de servicios que tienen al menos un trabajo
  const filtros = servicios
    .filter((s) => casos.some((c) => c.servicios.includes(s.slug)))
    .map(({ slug, titulo }) => ({ slug, titulo }));

  // Las tarjetas se renderizan en el servidor; el filtro (cliente) solo decide cuáles mostrar
  const items = casos.map((c) => ({ slug: c.slug, servicios: c.servicios, node: <CaseCard caso={c} /> }));

  return (
    <>
      <PageHero
        id="trabajos-titulo"
        title="Marcas que crecen con nosotras"
        intro="Algunos de los proyectos en los que nos pusimos la camiseta."
      />
      {/* Mismo fondo que el hero: sin padding arriba (lo da el hero). Abajo conserva el padding estándar de las secciones */}
      <Section tone="crema" labelledBy="trabajos-lista" className="pt-0 sm:pt-0">
        <h2 id="trabajos-lista" className="sr-only">
          Listado de trabajos
        </h2>
        <TrabajosFiltro filtros={filtros} items={items} />
      </Section>
      <CtaBanner title={home.ctaGeneral.titulo} subtitle={home.ctaGeneral.bajada} image="/images/hero/hero-3.jpg" variant="carbon" />
    </>
  );
}
