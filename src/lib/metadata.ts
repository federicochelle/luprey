import type { Metadata } from "next";
import { site } from "@/content/site";

type Options = {
  title: string;
  description: string;
  path: string;
  /** Si es true, ignora el template "%s | Luprey". */
  absoluteTitle?: boolean;
};

/** Metadata base por página: título, descripción, canonical y Open Graph. */
export function buildMetadata({ title, description, path, absoluteTitle }: Options): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.nombre}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.nombre,
      locale: "es_UY",
      type: "website",
    },
  };
}
