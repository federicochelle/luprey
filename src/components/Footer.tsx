import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { emailUrl, site } from "@/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

const iconClasses = "size-5";

/**
 * Dato de contacto: ícono en un círculo + texto visible, todo dentro del mismo link.
 * `contexto` es texto solo para lectores de pantalla (qué es el dato).
 */
function ContactLink({
  href,
  icon,
  texto,
  contexto,
  external,
}: {
  href: string;
  icon: ReactNode;
  texto: string;
  contexto: string;
  external?: boolean;
}) {
  const classes = "group flex items-center gap-3 hover:underline";
  const contenido = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-tone-line transition-colors group-hover:border-tone-fg group-hover:bg-tone-fg/10">
        {icon}
      </span>
      <span>
        <span className="sr-only">{contexto}: </span>
        {texto}
        {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {contenido}
    </Link>
  );
}

export function Footer() {
  return (
    <footer data-tone="carbon" className="bg-carbon-profundo py-16">
      <Container className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-tone-accent">{site.tagline}</p>
        </div>

        <ul aria-label="Contacto" className="space-y-3">
          <li>
            <ContactLink
              href={emailUrl()}
              icon={<Mail strokeWidth={1.5} className={iconClasses} aria-hidden="true" />}
              contexto="Email"
              texto={site.email}
            />
          </li>
          <li>
            <ContactLink
              href="/contacto"
              icon={<MapPin strokeWidth={1.5} className={iconClasses} aria-hidden="true" />}
              contexto="Ubicación"
              texto={site.ubicacion.texto}
            />
          </li>
        </ul>
      </Container>
      <Container className="mt-12 border-t border-tone-line pt-6 text-sm text-tone-accent">
        <p>© {site.nombre}. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}
