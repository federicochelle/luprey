import type { ReactNode } from "react";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Hero de las páginas internas (sobre fondo crema). */
export function PageHero({ id, eyebrow, title, intro, children }: Props) {
  return (
    <Section tone="crema" labelledBy={id} className="pb-16 pt-16 sm:pb-20 sm:pt-24">
      <SectionHeading as="h1" id={id} eyebrow={eyebrow} title={title} intro={intro} />
      {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
    </Section>
  );
}
