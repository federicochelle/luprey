import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { emailUrl, site, whatsappUrl } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Escribinos por WhatsApp, email o Instagram. Estamos en Mercedes, Soriano, Uruguay.",
  path: "/contacto",
});

export default function ContactoPage() {
  const { ubicacion } = site;
  const datos = [
    {
      titulo: "WhatsApp",
      texto: site.whatsapp.mostrar,
      href: whatsappUrl(),
      external: true,
      accion: "Escribinos",
    },
    { titulo: "Email", texto: site.email, href: emailUrl(), external: false, accion: "Mandanos un mail" },
    {
      titulo: "Instagram",
      texto: site.instagram.usuario,
      href: site.instagram.url,
      external: true,
      accion: "Seguinos",
    },
  ];

  return (
    <>
      <PageHero
        id="contacto-titulo"
        eyebrow="Contacto"
        title="Hablemos"
        intro="Contanos de tu marca. La forma más rápida de encontrarnos es por WhatsApp."
      />
      <Section tone="carbon" labelledBy="contacto-datos">
        <h2 id="contacto-datos" className="sr-only">
          Datos de contacto
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {datos.map((d) => (
            <li key={d.titulo} className="flex flex-col items-start rounded-2xl border border-tone-line p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">{d.titulo}</h3>
              <p className="mt-3 text-2xl font-bold break-all">{d.texto}</p>
              <Button href={d.href} external={d.external} variant="outline" className="mt-6">
                {d.accion}
              </Button>
            </li>
          ))}
          <li className="rounded-2xl border border-tone-line p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">Ubicación</h3>
            <address className="mt-3 text-2xl font-bold not-italic">
              {ubicacion.ciudad}, {ubicacion.departamento}
              <br />
              {ubicacion.pais}
            </address>
            <p className="mt-3 text-tone-accent">{ubicacion.direccion}</p>
          </li>
        </ul>
      </Section>
    </>
  );
}
