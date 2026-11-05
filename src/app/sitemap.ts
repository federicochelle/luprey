import type { MetadataRoute } from "next";
import { casosReales } from "@/content/casos";
import { servicios } from "@/content/servicios";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Los casos demo no entran al sitemap
  const rutas = [
    "/",
    "/servicios",
    ...servicios.map((s) => `/servicios/${s.slug}`),
    "/trabajos",
    ...casosReales.map((c) => `/trabajos/${c.slug}`),
    "/nosotros",
    "/contacto",
  ];
  return rutas.map((ruta) => ({ url: `${site.url}${ruta}` }));
}
