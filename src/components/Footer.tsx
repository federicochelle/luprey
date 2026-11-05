import Link from "next/link";
import { emailUrl, site, whatsappUrl } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  const { ubicacion } = site;
  return (
    <footer data-tone="carbon" className="py-16">
      <Container className="grid gap-12 md:grid-cols-3">
        <div>
          <Logo variant="claro" />
          <p className="mt-4 max-w-xs text-tone-accent">{site.tagline}</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">Navegación</h2>
          <ul className="mt-4 space-y-2">
            {site.menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">Contacto</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:underline">
                WhatsApp: {site.whatsapp.mostrar}
              </a>
            </li>
            <li>
              <a href={emailUrl()} className="hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram: {site.instagram.usuario}
              </a>
            </li>
            <li>
              {ubicacion.ciudad}, {ubicacion.departamento}, {ubicacion.pais}
            </li>
          </ul>
        </div>
      </Container>
      <Container className="mt-12 border-t border-tone-line pt-6 text-sm text-tone-accent">
        <p>© {site.nombre}. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}
