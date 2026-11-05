import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { ImageGallery } from "@/components/ImageGallery";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { casos, getCaso } from "@/content/casos";
import { getServicio } from "@/content/servicios";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) return {};
  return buildMetadata({
    title: `${caso.cliente}: caso de éxito`,
    description: caso.resumen,
    path: `/trabajos/${caso.slug}`,
  });
}

export default async function CasoPage({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) notFound();

  const serviciosCaso = caso.servicios.map(getServicio).filter((s) => s !== undefined);

  return (
    <>
      <PageHero id="caso-titulo" eyebrow={caso.rubro} title={caso.cliente} intro={caso.resumen} />

      <Section tone="carbon" labelledBy="hicimos-titulo">
        <SectionHeading id="hicimos-titulo" title="Qué hicimos" />
        <ul className="mt-10 list-disc space-y-2 pl-6">
          {caso.queSeHizo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {serviciosCaso.length > 0 && (
          <p className="mt-8 text-tone-accent">
            Servicios involucrados:{" "}
            {serviciosCaso.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ", "}
                <Link href={`/servicios/${s.slug}`} className="text-tone-fg underline underline-offset-4">
                  {s.titulo}
                </Link>
              </span>
            ))}
          </p>
        )}
      </Section>

      <Section tone="crema" labelledBy="galeria-titulo">
        <SectionHeading id="galeria-titulo" title="Galería" />
        <ImageGallery imagenes={caso.imagenes} />
      </Section>

      <CtaBanner id="caso-cta" tone="carbon" />
    </>
  );
}
