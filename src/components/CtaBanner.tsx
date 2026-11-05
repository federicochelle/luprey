import Image from "next/image";
import { useId } from "react";
import { servicios } from "@/content/servicios";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Trazo, type TrazoProps } from "./Trazo";
import { WhatsAppForm } from "./WhatsAppForm";

type Props = {
  title: string;
  subtitle?: string;
  /** Ruta de la imagen (decorativa) */
  image: string;
  variant?: "crema" | "carbon";
  /** slug del servicio a preseleccionar en el formulario */
  defaultService?: string;
  /** Nivel del título (h1 si es lo único de la página, como en /contacto) */
  as?: "h1" | "h2";
  /** Trazo decorativo en el borde de la sección */
  trazo?: TrazoProps;
};

// En mobile la sección siempre es oscura (imagen de fondo + capa carbón) y el formulario va en una tarjeta crema.
// Estas clases redefinen los tokens de tono solo hasta `lg` para que el texto sea crema sobre la imagen.
const MOBILE_OSCURO = "max-lg:[--tone-bg:#26282c] max-lg:[--tone-fg:#fcfaee] max-lg:[--tone-accent:rgb(252_250_238/0.92)] max-lg:[--tone-line:rgb(252_250_238/0.2)]";
const TARJETA_CREMA =
  "max-lg:rounded-2xl max-lg:bg-tone-bg max-lg:p-6 max-lg:text-tone-fg max-lg:[--tone-bg:#fcfaee] max-lg:[--tone-fg:#26282c] max-lg:[--tone-accent:#6e7262] max-lg:[--tone-line:rgb(38_40_44/0.25)] sm:max-lg:p-8";

/** Sección de cierre reutilizable: título, bajada opcional, formulario a WhatsApp e imagen. */
export function CtaBanner({ title, subtitle, image, variant = "crema", defaultService, as, trazo }: Props) {
  const titleId = useId();

  return (
    <section
      data-tone={variant}
      aria-labelledby={titleId}
      className={`relative isolate flex items-center overflow-hidden py-20 sm:py-28 lg:min-h-[44rem] ${variant === "crema" ? MOBILE_OSCURO : ""}`}
    >
      {/* Mobile: imagen de fondo de toda la sección + capa carbón */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:hidden">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-carbon/80" />
      </div>

      {trazo && <Trazo {...trazo} />}

      <Container className="w-full">
        {/* Mitad izquierda del Container: el contenido queda alineado con el resto del sitio */}
        <div className="lg:w-1/2 lg:pr-12">
          <SectionHeading id={titleId} as={as} title={title} intro={subtitle} />
          <div className={`mt-10 ${TARJETA_CREMA}`}>
            <WhatsAppForm
              servicios={servicios.map(({ slug, titulo }) => ({ slug, titulo }))}
              defaultService={defaultService}
            />
          </div>
        </div>
      </Container>

      {/* Desktop: imagen a sangre en la mitad derecha, de borde a borde y a toda la altura de la sección */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image src={image} alt="" fill sizes="50vw" className="object-cover" />
      </div>
    </section>
  );
}
