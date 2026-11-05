import Image from "next/image";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Trazo, type TrazoProps } from "./Trazo";

type Props = {
  title: string;
  text?: string;
  /** Ruta de la imagen (decorativa) */
  image: string;
  /** Invierte el orden en desktop: imagen a la izquierda y texto a la derecha */
  reverse?: boolean;
  variant?: "crema" | "carbon";
  /** Nivel del título (h1 si es la primera sección de la página) */
  as?: "h1" | "h2";
  /** Kicker sobre el título */
  eyebrow?: string;
  /** Título más chico */
  compactTitle?: boolean;
  /**
   * Cómo se acomoda el texto en desktop:
   * - "container" (por defecto): alineado al Container del sitio, pegado a la línea central.
   * - "mitad": reparto 50/50 real: el texto queda centrado en su mitad de la pantalla, con aire a ambos lados.
   */
  reparto?: "container" | "mitad";
  className?: string;
  /** Trazo decorativo en el borde de la sección */
  trazo?: TrazoProps;
  /** Contenido extra debajo del título/texto (por ejemplo un botón) */
  children?: ReactNode;
};

/**
 * Sección en dos columnas: texto (alineado al Container) e imagen a sangre hasta el borde de la pantalla.
 * En mobile: imagen arriba y texto abajo.
 */
export function SplitSection({ title, text, image, reverse, variant = "crema", as, eyebrow, compactTitle, reparto = "container", className, trazo, children }: Props) {
  const titleId = useId();

  return (
    <section
      data-tone={variant}
      aria-labelledby={titleId}
      className={cn("relative isolate overflow-hidden lg:flex lg:min-h-[32rem] lg:items-center", className)}
    >
      {trazo && <Trazo {...trazo} />}

      {/* Mobile: imagen arriba */}
      <div aria-hidden="true" className="relative aspect-[4/3] sm:aspect-[16/9] lg:hidden">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {reparto === "mitad" ? (
        <div className={cn("w-full px-5 py-16 sm:px-8 sm:py-20 lg:w-1/2 lg:px-12 lg:py-28 xl:px-20", reverse && "lg:ml-auto")}>
          <div className="mx-auto max-w-xl lg:max-w-lg xl:max-w-xl">
            <SectionHeading id={titleId} as={as} eyebrow={eyebrow} compact={compactTitle} title={title} intro={text} />
            {children}
          </div>
        </div>
      ) : (
        <Container className="w-full py-16 sm:py-20 lg:py-28">
          <div className={cn("lg:w-1/2", reverse ? "lg:ml-auto lg:pl-12" : "lg:pr-12")}>
            <SectionHeading id={titleId} as={as} eyebrow={eyebrow} compact={compactTitle} title={title} intro={text} />
            {children}
          </div>
        </Container>
      )}

      {/* Desktop: imagen a sangre en su mitad, de borde a borde y a toda la altura */}
      <div aria-hidden="true" className={cn("absolute inset-y-0 hidden w-1/2 lg:block", reverse ? "left-0" : "right-0")}>
        <Image src={image} alt="" fill sizes="50vw" className="object-cover" />
      </div>
    </section>
  );
}
