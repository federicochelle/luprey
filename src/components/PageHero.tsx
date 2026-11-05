import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

type Props = {
  id: string;
  /** Color de fondo (por defecto crema) */
  tone?: "crema" | "carbon";
  /** Ícono opcional sobre el título */
  icon?: ReactNode;
  /** Imagen opcional: a la derecha en desktop, debajo en mobile */
  image?: { src: string; alt?: string };
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Hero de las páginas internas. */
export function PageHero({ id, tone = "crema", icon, image, eyebrow, title, intro, children }: Props) {
  return (
    <Section tone={tone} labelledBy={id} className="pb-16 pt-16 sm:pb-20 sm:pt-24">
      <div className={cn(image && "grid items-center gap-12 lg:grid-cols-2 lg:gap-16")}>
        <div>
          {icon && <div className="mb-6">{icon}</div>}
          <SectionHeading as="h1" id={id} eyebrow={eyebrow} title={title} intro={intro} compact={!!image} />
          {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              fill
              sizes="(min-width: 1152px) 544px, (min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Section>
  );
}
