import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CaseGallery } from "@/components/CaseGallery";
import { Container } from "@/components/Container";
import { CtaBanner } from "@/components/CtaBanner";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { casos, getCaso } from "@/content/casos";
import { home } from "@/content/home";
import { getServicio } from "@/content/servicios";
import { SHOW_TRABAJOS } from "@/lib/config";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!SHOW_TRABAJOS || !caso) return {};
  return buildMetadata({
    title: `${caso.cliente} · ${caso.titulo}`,
    description: caso.resumen,
    path: `/trabajos/${caso.slug}`,
  });
}

export default async function CasoPage({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!SHOW_TRABAJOS || !caso) notFound();

  const serviciosCaso = caso.servicios.map(getServicio).filter((s) => s !== undefined);

  // Fondos de las secciones opcionales: las que no tienen color fijo alternan con la anterior;
  // si quedan del mismo color que la anterior, se unen (sin padding superior doble).
  let anterior: "crema" | "carbon" = "crema"; // "El trabajo" es crema
  const siguienteTono = (fijo?: "crema" | "carbon") => {
    const tone = fijo ?? (anterior === "crema" ? "carbon" : "crema");
    const className = tone === anterior ? "pt-0 sm:pt-0" : undefined;
    anterior = tone;
    return { tone, className };
  };

  const hayResultadosOTestimonio = Boolean(caso.resultados?.length || caso.testimonio);

  // Antes de renderizar, para que el orden de los tonos siga el orden de las secciones
  const tGaleria = caso.galeria?.length ? siguienteTono("crema") : null;
  const tAntesDespues = caso.antesDespues ? siguienteTono() : null;
  const tResultados = hayResultadosOTestimonio ? siguienteTono("crema") : null;

  return (
    <>
      {/* a. Portada a sangre (~70vh) con capa carbón */}
      <section
        data-tone="carbon"
        aria-labelledby="caso-titulo"
        // Subtítulo casi en crema pleno: asegura contraste AA sobre la foto
        className="relative isolate flex min-h-[70vh] items-center overflow-hidden [--tone-accent:rgb(252_250_238/0.92)]"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src={caso.portada.src} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-carbon/65" />
        </div>
        <Container className="w-full py-20 sm:py-28">
          <SectionHeading as="h1" compact id="caso-titulo" title={caso.titulo} className="max-w-4xl" />
        </Container>
      </section>

      {/* b. El trabajo: resumen + ficha */}
      <Section tone="crema" labelledBy="trabajo-titulo">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="trabajo-titulo" title="El trabajo" />
            <p className="mt-8 max-w-2xl text-xl leading-relaxed sm:text-2xl">{caso.resumen}</p>
          </div>
          <dl className="divide-y divide-tone-line self-start rounded-2xl border border-tone-line">
            <Dato titulo="Cliente">{caso.cliente}</Dato>
            <Dato titulo="Rubro">{caso.rubro}</Dato>
            <Dato titulo="Servicios">
              <ul className="space-y-1">
                {serviciosCaso.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servicios/${s.slug}`} className="underline underline-offset-4 hover:no-underline">
                      {s.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </Dato>
            <Dato titulo="Ciudad">{caso.ciudad}</Dato>
            <Dato titulo="Año">{caso.anio}</Dato>
          </dl>
        </div>
      </Section>

      {/* c. Galería (opcional): fotos y reels en un mismo mosaico */}
      {tGaleria && caso.galeria && (
        <Section tone={tGaleria.tone} labelledBy="galeria-titulo" className={tGaleria.className}>
          <SectionHeading id="galeria-titulo" title="Galería" />
          <CaseGallery elementos={caso.galeria} />
        </Section>
      )}

      {/* d. Antes y después (opcional) */}
      {tAntesDespues && caso.antesDespues && (
        <Section tone={tAntesDespues.tone} labelledBy="antes-despues-titulo" className={tAntesDespues.className}>
          <SectionHeading id="antes-despues-titulo" title="Antes y después" />
          <BeforeAfter {...caso.antesDespues} />
        </Section>
      )}

      {/* e. Resultados y testimonio (opcional, crema) */}
      {tResultados && (
        <Section tone={tResultados.tone} labelledBy="resultados-titulo" className={tResultados.className}>
          <h2 id="resultados-titulo" className="sr-only">
            Resultados y testimonio
          </h2>
          {caso.resultados && caso.resultados.length > 0 && (
            <dl className="grid gap-10 sm:grid-cols-3">
              {caso.resultados.map((r) => (
                <div key={r.label} className="border-t-2 border-oliva pt-6">
                  <dd className="text-6xl font-bold leading-none text-oliva sm:text-7xl">{r.valor}</dd>
                  <dt className="mt-4 text-lg">{r.label}</dt>
                </div>
              ))}
            </dl>
          )}
          {caso.testimonio && (
            <figure className={caso.resultados?.length ? "mt-20" : undefined}>
              <blockquote className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">“{caso.testimonio.texto}”</blockquote>
              <figcaption className="mt-6 text-lg text-tone-accent">
                {caso.testimonio.autor}
                {caso.testimonio.cargo && ` · ${caso.testimonio.cargo}`}
              </figcaption>
            </figure>
          )}
        </Section>
      )}

      {/* f. Cierre */}
      <CtaBanner
        title={home.ctaGeneral.titulo}
        subtitle={home.ctaGeneral.bajada}
        image={caso.portada.src}
        variant="carbon"
        defaultService={caso.servicios[0]}
      />
    </>
  );
}

function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="p-5 sm:px-6">
      <dt className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">{titulo}</dt>
      <dd className="mt-1 text-lg">{children}</dd>
    </div>
  );
}
