import type { MetadataRoute } from "next";
import { casosReales } from "@/content/casos";
import { servicios } from "@/content/servicios";
import { site } from "@/content/site";
import { SHOW_TRABAJOS } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Los casos demo no entran al sitemap
  const rutas = [
    "/",
    "/servicios",
    ...servicios.map((s) => `/servicios/${s.slug}`),
    ...(SHOW_TRABAJOS ? ["/trabajos", ...casosReales.map((c) => `/trabajos/${c.slug}`)] : []),
    "/nosotras",
    "/contacto",
  ];
  return rutas.map((ruta) => ({ url: `${site.url}${ruta}` }));
}
