import type { MetadataRoute } from "next";
import { casos } from "@/content/casos";
import { servicios } from "@/content/servicios";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    "/",
    "/servicios",
    ...servicios.map((s) => `/servicios/${s.slug}`),
    "/trabajos",
    ...casos.map((c) => `/trabajos/${c.slug}`),
    "/nosotros",
    "/contacto",
  ];
  return rutas.map((ruta) => ({ url: `${site.url}${ruta}` }));
}
