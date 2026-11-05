// ---------------------------------------------------------------------------------------------
// Casos (trabajos). La plantilla /trabajos/[slug] es un molde único: las secciones OPCIONALES
// (galeria, reels, antesDespues, testimonio, resultados) se muestran solo si el caso las tiene.
//
// CÓMO CARGAR UN TRABAJO NUEVO
// 1. Copiá las imágenes a public/images/casos/ y (si hay) los videos a public/videos/casos/.
// 2. Agregá un objeto a `todosLosCasos` con los campos obligatorios y los opcionales que tengas.
// 3. Listo: aparece en /trabajos, en el sitemap y en /trabajos/<slug>, y se vincula con sus servicios.
// ---------------------------------------------------------------------------------------------

export type Imagen = { src: string; alt: string };

export type Formato = "horizontal" | "vertical" | "cuadrada";
/** Imagen de la galería. `formato` define el tamaño del mosaico (por defecto, horizontal); vertical ocupa dos filas. */
export type ImagenGaleria = Imagen & { formato?: Formato };

/** Video vertical 9:16 (mp4 local, idealmente sin audio y liviano) con su imagen de poster. */
export type Reel = { src: string; poster: string; alt: string };

export type AntesDespues = { antes: string; despues: string; alt: string };
export type Testimonio = { texto: string; autor: string; cargo?: string };
export type Resultado = { valor: string; label: string };

export type Caso = {
  // --- Obligatorios ---
  slug: string;
  cliente: string;
  titulo: string;
  rubro: string;
  /** slugs de servicios (ver servicios.ts), uno o más */
  servicios: string[];
  ciudad: string;
  anio: number;
  /** 2-3 oraciones: qué necesitaba el cliente y qué hicimos */
  resumen: string;
  portada: Imagen;
  // --- Opcionales (cada sección se muestra solo si existe) ---
  galeria?: ImagenGaleria[];
  reels?: Reel[];
  antesDespues?: AntesDespues;
  testimonio?: Testimonio;
  resultados?: Resultado[];
  // --- Gestión ---
  destacado: boolean;
  /** Contenido de demostración: se oculta con SHOW_DEMO_CASES = false */
  demo?: boolean;
};

/**
 * Casos de demostración (con `demo: true`).
 * PONER EN false ANTES DE PUBLICAR. Con false desaparecen de /trabajos, del sitemap
 * y sus páginas /trabajos/<slug> dejan de existir (404).
 */
export const SHOW_DEMO_CASES = true;

const img = (nombre: string) => `/images/casos/${nombre}.jpg`;
const reel = (n: number, alt: string): Reel => ({
  src: `/videos/casos/reel-${n}.mp4`,
  poster: `/images/casos/reel-${n}-poster.jpg`,
  alt,
});

const todosLosCasos: Caso[] = [
  // ---------- REALES ----------
  // Variante completa: todas las secciones opcionales (con textos [COMPLETAR], sin inventar cifras de un cliente real)
  {
    slug: "tabla-y-birra",
    cliente: "Tabla y Birra",
    titulo: "Un catálogo y contenido que muestran el mobiliario en acción",
    rubro: "Alquiler de mobiliario",
    servicios: ["contenido", "catalogos"],
    ciudad: "Mercedes",
    anio: 2025, // [COMPLETAR]
    resumen:
      "Tabla y Birra necesitaba mostrar su mobiliario como se ve en un evento real y facilitar que sus clientes elijan. Armamos un catálogo claro y una línea de contenido para redes pensada para eventos. [COMPLETAR: detalles del trabajo]",
    portada: { src: img("tabla-y-birra-1"), alt: "[COMPLETAR] Mobiliario de Tabla y Birra" },
    galeria: [
      { src: img("tabla-y-birra-1"), alt: "[COMPLETAR] Sillas blancas armadas para un evento", formato: "horizontal" },
      { src: img("tabla-y-birra-4"), alt: "[COMPLETAR] Mesa decorada con flores", formato: "vertical" },
      { src: img("tabla-y-birra-2"), alt: "[COMPLETAR] Mesa de buffet al aire libre", formato: "cuadrada" },
      { src: img("tabla-y-birra-3"), alt: "[COMPLETAR] Salón con mesas y sillas dispuestas", formato: "horizontal" },
    ],
    reels: [reel(1, "[COMPLETAR] Reel de Tabla y Birra"), reel(2, "[COMPLETAR] Reel de un evento con mobiliario")],
    antesDespues: {
      antes: img("tabla-y-birra-antes"),
      despues: img("tabla-y-birra-1"),
      alt: "[COMPLETAR] Foto del mobiliario antes y después de la producción",
    },
    testimonio: {
      texto: "[COMPLETAR] Testimonio del cliente sobre cómo fue trabajar con Luprey.",
      autor: "[COMPLETAR]",
      cargo: "Tabla y Birra",
    },
    resultados: [
      { valor: "+00%", label: "[COMPLETAR] resultado 1" },
      { valor: "+00", label: "[COMPLETAR] resultado 2" },
      { valor: "0x", label: "[COMPLETAR] resultado 3" },
    ],
    destacado: true,
  },
  // Galería + reels + testimonio
  {
    slug: "deleite",
    cliente: "Deleite",
    titulo: "Un día de contenido para llenar las redes de material propio",
    rubro: "[COMPLETAR]",
    servicios: ["fotografia", "contenido"],
    ciudad: "[COMPLETAR]",
    anio: 2025, // [COMPLETAR]
    resumen:
      "Deleite necesitaba material de calidad para sus redes sin pasar semanas produciendo. Hicimos un día de contenido en el local y entregamos fotos y videos listos para publicar. [COMPLETAR: detalles del trabajo]",
    portada: { src: img("deleite-1"), alt: "[COMPLETAR] Interior de Deleite" },
    galeria: [
      { src: img("deleite-1"), alt: "[COMPLETAR] Mostrador y ambiente del local", formato: "horizontal" },
      { src: img("deleite-4"), alt: "[COMPLETAR] Café con leche en preparación", formato: "vertical" },
      { src: img("deleite-3"), alt: "[COMPLETAR] Café y pan dulce", formato: "cuadrada" },
      { src: img("deleite-2"), alt: "[COMPLETAR] Productos de panadería", formato: "horizontal" },
    ],
    reels: [reel(3, "[COMPLETAR] Reel del día de contenido en Deleite")],
    testimonio: {
      texto: "[COMPLETAR] Testimonio del cliente sobre el día de contenido.",
      autor: "[COMPLETAR]",
    },
    destacado: true,
  },

  // ---------- DEMO (se ocultan con SHOW_DEMO_CASES = false) ----------
  // Solo galería
  {
    slug: "tabla-y-birra-demo-2",
    cliente: "Tabla y Birra",
    titulo: "Eventos de verano: mesas y sillas en escenarios reales",
    rubro: "Alquiler de mobiliario",
    servicios: ["fotografia", "contenido"],
    ciudad: "Mercedes",
    anio: 2024,
    resumen:
      "Para la temporada alta necesitaban fotos del mobiliario en eventos reales. Hicimos una producción en tres escenarios y armamos piezas para redes con el calendario de disponibilidad.",
    portada: { src: img("tabla-y-birra-2"), alt: "[DEMO] Mesa de evento al aire libre" },
    galeria: [
      { src: img("tabla-y-birra-2"), alt: "[DEMO] Mesa de evento al aire libre", formato: "horizontal" },
      { src: img("tabla-y-birra-3"), alt: "[DEMO] Salón armado para un evento", formato: "cuadrada" },
      { src: img("tabla-y-birra-4"), alt: "[DEMO] Mesa decorada con flores", formato: "vertical" },
      { src: img("tabla-y-birra-1"), alt: "[DEMO] Sillas dispuestas en un jardín", formato: "horizontal" },
    ],
    destacado: true,
    demo: true,
  },
  // Galería + antes y después
  {
    slug: "deleite-demo-2",
    cliente: "Deleite",
    titulo: "Lanzamiento de carta con piezas que se reconocen",
    rubro: "Gastronomía",
    servicios: ["contenido", "diseno-grafico"],
    ciudad: "Fray Bentos",
    anio: 2024,
    resumen:
      "Iban a lanzar una carta nueva y sus piezas de redes cambiaban de estilo cada semana. Ordenamos la imagen y produjimos el material para anunciarla.",
    portada: { src: img("deleite-2"), alt: "[DEMO] Productos de panadería de la carta nueva" },
    galeria: [
      { src: img("deleite-2"), alt: "[DEMO] Productos de la carta nueva", formato: "horizontal" },
      { src: img("deleite-1"), alt: "[DEMO] Mostrador y ambiente del local", formato: "horizontal" },
      { src: img("deleite-3"), alt: "[DEMO] Café con acompañamiento", formato: "cuadrada" },
    ],
    antesDespues: {
      antes: img("deleite-antes"),
      despues: img("deleite-2"),
      alt: "[DEMO] Foto de producto antes y después de la producción",
    },
    destacado: true,
    demo: true,
  },
  // Galería + resultados + testimonio
  {
    slug: "tabla-y-birra-demo-3",
    cliente: "Tabla y Birra",
    titulo: "Un sitio y un catálogo para organizar bodas y cumpleaños",
    rubro: "Alquiler de mobiliario",
    servicios: ["catalogos", "desarrollo-web"],
    ciudad: "Mercedes",
    anio: 2025,
    resumen:
      "Quienes organizaban celebraciones no encontraban fácil qué se podía alquilar. Armamos paquetes claros en un catálogo y un sitio rápido que lleva directo al WhatsApp.",
    portada: { src: img("tabla-y-birra-3"), alt: "[DEMO] Mesas decoradas para una celebración" },
    galeria: [
      { src: img("tabla-y-birra-3"), alt: "[DEMO] Mesas decoradas para una celebración", formato: "horizontal" },
      { src: img("tabla-y-birra-1"), alt: "[DEMO] Filas de sillas blancas", formato: "cuadrada" },
      { src: img("tabla-y-birra-2"), alt: "[DEMO] Mesa de buffet al aire libre", formato: "cuadrada" },
    ],
    testimonio: {
      texto: "Ahora las consultas llegan con todo claro: qué quieren, para cuántos y para cuándo.",
      autor: "Cliente de ejemplo",
      cargo: "[DEMO]",
    },
    resultados: [
      { valor: "+40%", label: "consultas por WhatsApp" },
      { valor: "3x", label: "más visitas al sitio" },
      { valor: "-50%", label: "tiempo respondiendo precios" },
    ],
    destacado: false,
    demo: true,
  },
  // Galería + testimonio
  {
    slug: "deleite-demo-3",
    cliente: "Deleite",
    titulo: "Redes con calendario: la cafetería de cada temporada",
    rubro: "Gastronomía",
    servicios: ["redes-sociales", "contenido"],
    ciudad: "Fray Bentos",
    anio: 2025,
    resumen:
      "Publicaban cuando podían y sin una línea clara. Armamos una estrategia simple con calendario mensual centrado en los productos de cada estación.",
    portada: { src: img("deleite-3"), alt: "[DEMO] Café y pan dulce sobre una mesa" },
    galeria: [
      { src: img("deleite-3"), alt: "[DEMO] Café y pan dulce sobre una mesa", formato: "cuadrada" },
      { src: img("deleite-4"), alt: "[DEMO] Café con leche en preparación", formato: "vertical" },
      { src: img("deleite-1"), alt: "[DEMO] Interior de la cafetería", formato: "horizontal" },
    ],
    testimonio: {
      texto: "Pasamos de subir cosas sueltas a tener un plan. Se nota en cómo nos escribe la gente.",
      autor: "Cliente de ejemplo",
      cargo: "[DEMO]",
    },
    destacado: false,
    demo: true,
  },
];

/** Lista para las páginas: excluye los casos demo si SHOW_DEMO_CASES es false. */
export const casos: Caso[] = SHOW_DEMO_CASES ? todosLosCasos : todosLosCasos.filter((c) => !c.demo);

/** Casos reales (sin demo). El sitemap y el script de imágenes usan esta lista. */
export const casosReales: Caso[] = todosLosCasos.filter((c) => !c.demo);

export function getCaso(slug: string) {
  return casos.find((c) => c.slug === slug);
}

/** El siguiente caso de la lista; después del último vuelve al primero. */
export function getSiguienteCaso(slug: string) {
  const i = casos.findIndex((c) => c.slug === slug);
  return i === -1 || casos.length < 2 ? undefined : casos[(i + 1) % casos.length];
}

/** Máximo 3 casos destacados para la home. */
export function getCasosDestacados() {
  return casos.filter((c) => c.destacado).slice(0, 3);
}

/** Casos que incluyen un servicio (en el orden de la lista). */
export function getCasosPorServicio(servicioSlug: string) {
  return casos.filter((c) => c.servicios.includes(servicioSlug));
}
