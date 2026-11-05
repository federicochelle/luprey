export type Imagen = { src: string; alt: string };

export type Caso = {
  slug: string;
  cliente: string;
  rubro: string;
  resumen: string;
  queSeHizo: string[];
  /** slugs de servicios (ver servicios.ts) */
  servicios: string[];
  destacado: boolean;
  imagenes: Imagen[];
};

const placeholder = "/placeholders/imagen.svg";

export const casos: Caso[] = [
  {
    slug: "tabla-y-birra",
    cliente: "Tabla y Birra",
    rubro: "Alquiler de mobiliario",
    resumen:
      "Les armamos el contenido y el catálogo para que su mobiliario se vea tan bien como en un evento real. [COMPLETAR: resultados y detalles del trabajo]",
    queSeHizo: ["Contenido para redes", "Catálogo de mobiliario"],
    servicios: ["contenido", "catalogos"],
    destacado: true,
    imagenes: [
      { src: placeholder, alt: "[COMPLETAR] Foto del mobiliario de Tabla y Birra" },
      { src: placeholder, alt: "[COMPLETAR] Página del catálogo de Tabla y Birra" },
      { src: placeholder, alt: "[COMPLETAR] Contenido para redes de Tabla y Birra" },
    ],
  },
  {
    slug: "deleite",
    cliente: "Deleite",
    rubro: "[COMPLETAR]",
    resumen:
      "Hicimos un día de contenido para juntar material de calidad para sus redes en una sola jornada. [COMPLETAR: resultados y detalles del trabajo]",
    queSeHizo: ["Día de contenido"],
    servicios: ["contenido", "fotografia"],
    destacado: true,
    imagenes: [
      { src: placeholder, alt: "[COMPLETAR] Foto del día de contenido de Deleite" },
      { src: placeholder, alt: "[COMPLETAR] Detrás de escena en Deleite" },
      { src: placeholder, alt: "[COMPLETAR] Piezas finales para redes de Deleite" },
    ],
  },
];

export function getCaso(slug: string) {
  return casos.find((c) => c.slug === slug);
}

export function getCasosDestacados() {
  return casos.filter((c) => c.destacado);
}

export function getCasosPorServicio(servicioSlug: string) {
  return casos.filter((c) => c.servicios.includes(servicioSlug));
}
