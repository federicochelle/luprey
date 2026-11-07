// ---------------------------------------------------------------------------------------------
// Casos (trabajos). La plantilla /trabajos/[slug] es un molde único: las secciones OPCIONALES
// (galeria, antesDespues, testimonio, resultados) se muestran solo si el caso las tiene.
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
type Reel = { src: string; poster: string; alt: string };

/**
 * Elemento de la galería: una imagen o un reel. Todo va en la misma grilla tipo mosaico, en el orden de la lista.
 * Un reel ocupa siempre un casillero vertical (como una imagen "vertical": una columna y dos filas).
 *
 * Para que el mosaico cierre sin huecos (4 columnas en desktop, 2 en mobile) conviene que las celdas sumen un
 * múltiplo de 4: horizontal = 2, vertical/reel = 2, cuadrada = 1. Combinaciones que cierran bien:
 *   [horizontal, vertical/reel, vertical/reel, horizontal]  -> 8 celdas, 2 filas
 *   [cuadrada, cuadrada, horizontal]                         -> 4 celdas, 1 fila
 */
export type ElementoGaleria = ({ tipo?: "imagen" } & ImagenGaleria) | ({ tipo: "reel" } & Reel);

export type AntesDespues = { antes: string; despues: string; alt: string };
type Testimonio = { texto: string; autor: string; cargo?: string };
type Resultado = { valor: string; label: string };

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
  galeria?: ElementoGaleria[];
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
const reel = (n: number, alt: string): ElementoGaleria => ({
  tipo: "reel",
  src: `/videos/casos/reel-${n}.mp4`,
  poster: `/images/casos/reel-${n}-poster.jpg`,
  alt,
});

const todosLosCasos: Caso[] = [
  // ---------- REALES ----------
  // Variante completa (galería con reels y antes/después). El testimonio y los resultados están ocultos
  // hasta tener datos reales del cliente: ver los bloques comentados más abajo.
  {
    slug: "tabla-y-birra",
    cliente: "Tabla y Birra",
    titulo: "Un catálogo y contenido que muestran el mobiliario en acción",
    rubro: "Alquiler de mobiliario",
    servicios: ["contenido", "diseno-grafico"],
    ciudad: "Mercedes",
    anio: 2025, // [COMPLETAR] confirmar el año real del trabajo
    // [COMPLETAR] sumar los detalles reales del trabajo al resumen
    resumen:
      "Tabla y Birra necesitaba mostrar su mobiliario como se ve en un evento real y facilitar que sus clientes elijan. Armamos un catálogo claro y una línea de contenido para redes pensada para eventos.",
    portada: { src: img("tabla-y-birra-1"), alt: "Carpa blanca para eventos con ventanales, armada sobre un patio de piedra entre árboles" },
    galeria: [
      { src: img("tabla-y-birra-1"), alt: "Carpa blanca para eventos con ventanales, armada sobre un patio de piedra entre árboles", formato: "horizontal" },
      reel(1, "Taza de café y galletitas sobre una cama con mantas, una vela y hojas de otoño"),
      reel(2, "Ensalada con salmón y un tenedor en un bol de madera"),
      { src: img("tabla-y-birra-3"), alt: "Salón con mesas largas, sillas de madera y servilletas naranjas", formato: "horizontal" },
    ],
    antesDespues: {
      antes: img("tabla-y-birra-antes"),
      despues: img("tabla-y-birra-1"),
      alt: "Carpa para eventos: a la izquierda la foto sin trabajar y a la derecha con color y contraste",
    },
    // Ocultos hasta tener datos reales (descomentar para mostrarlos):
    // testimonio: { texto: "...", autor: "...", cargo: "Tabla y Birra" },
    // resultados: [
    //   { valor: "...", label: "..." },
    //   { valor: "...", label: "..." },
    //   { valor: "...", label: "..." },
    // ],
    destacado: true,
  },
  // Galería con reel. El testimonio está oculto hasta tener datos reales.
  {
    slug: "deleite",
    cliente: "Deleite",
    titulo: "Un día de contenido para llenar las redes de material propio",
    rubro: "Gastronomía",
    servicios: ["fotografia", "contenido"],
    ciudad: "Mercedes", // [COMPLETAR] ciudad de ejemplo: confirmar
    anio: 2025, // [COMPLETAR] año de ejemplo: confirmar
    // [COMPLETAR] sumar los detalles reales del trabajo al resumen
    resumen:
      "Deleite necesitaba material de calidad para sus redes sin pasar semanas produciendo. Hicimos un día de contenido en el local y entregamos fotos y videos listos para publicar.",
    portada: { src: img("deleite-1"), alt: "Mostrador de una cafetería con pizarra de menú y máquinas de café" },
    galeria: [
      { src: img("deleite-1"), alt: "Mostrador de una cafetería con pizarra de menú y máquinas de café", formato: "horizontal" },
      reel(3, "Muffins con chips recién horneados sobre una rejilla"),
      { src: img("deleite-4"), alt: "Leche cayendo en una taza de café rodeada de granos", formato: "vertical" },
      { src: img("deleite-2"), alt: "Medialunas recién horneadas en una canasta", formato: "horizontal" },
    ],
    // Oculto hasta tener datos reales (descomentar para mostrarlo):
    // testimonio: { texto: "...", autor: "..." },
    destacado: true,
  },

  // ---------- DEMO (se ocultan con SHOW_DEMO_CASES = false) ----------
  // Solo galería
  {
    slug: "tabla-y-birra-demo-2",
    cliente: "Tabla y Birra",
    titulo: "Eventos de verano, mesas y sillas en escenarios reales",
    rubro: "Alquiler de mobiliario",
    servicios: ["fotografia", "contenido"],
    ciudad: "Mercedes",
    anio: 2024,
    resumen:
      "Para la temporada alta necesitaban fotos del mobiliario en eventos reales. Hicimos una producción en tres escenarios y armamos piezas para redes con el calendario de disponibilidad.",
    portada: { src: img("tabla-y-birra-2"), alt: "Mesa de buffet al aire libre con tulipanes, copas y botellas" },
    galeria: [
      { src: img("tabla-y-birra-2"), alt: "Mesa de buffet al aire libre con tulipanes, copas y botellas", formato: "horizontal" },
      { src: img("tabla-y-birra-4"), alt: "Mujer apoyada en una mesa con mantel rosa junto a un jarrón con flores", formato: "vertical" },
      { src: img("tabla-y-birra-3"), alt: "Salón con mesas largas, sillas de madera y servilletas naranjas", formato: "vertical" },
      { src: img("tabla-y-birra-1"), alt: "Carpa blanca para eventos con ventanales, armada sobre un patio de piedra", formato: "horizontal" },
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
    portada: { src: img("deleite-2"), alt: "Medialunas recién horneadas en una canasta" },
    galeria: [
      { src: img("deleite-3"), alt: "Taza de café y rebanada de pan dulce con pasas sobre una bandeja", formato: "cuadrada" },
      { src: img("deleite-2"), alt: "Medialunas recién horneadas en una canasta", formato: "cuadrada" },
      { src: img("deleite-1"), alt: "Mostrador de una cafetería con pizarra de menú y máquinas de café", formato: "horizontal" },
    ],
    antesDespues: {
      antes: img("deleite-antes"),
      despues: img("deleite-2"),
      alt: "Medialunas en una canasta: a la izquierda la foto apagada y a la derecha con color y luz trabajados",
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
    servicios: ["diseno-grafico", "desarrollo-web"],
    ciudad: "Mercedes",
    anio: 2025,
    resumen:
      "Quienes organizaban celebraciones no encontraban fácil qué se podía alquilar. Armamos paquetes claros en un catálogo y un sitio rápido que lleva directo al WhatsApp.",
    portada: { src: img("tabla-y-birra-3"), alt: "Salón con mesas largas, sillas de madera y servilletas naranjas" },
    galeria: [
      { src: img("tabla-y-birra-1"), alt: "Carpa blanca para eventos con ventanales, armada sobre un patio de piedra", formato: "cuadrada" },
      { src: img("tabla-y-birra-2"), alt: "Mesa de buffet al aire libre con tulipanes, copas y botellas", formato: "cuadrada" },
      { src: img("tabla-y-birra-3"), alt: "Salón con mesas largas, sillas de madera y servilletas naranjas", formato: "horizontal" },
    ],
    testimonio: {
      texto: "Ahora las consultas llegan con todo claro: qué quieren, para cuántos y para cuándo.",
      autor: "Una clienta",
      cargo: "Organizó un cumpleaños de quince",
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
    titulo: "Redes con calendario para la cafetería de cada temporada",
    rubro: "Gastronomía",
    servicios: ["redes-sociales", "contenido"],
    ciudad: "Fray Bentos",
    anio: 2025,
    resumen:
      "Publicaban cuando podían y sin una línea clara. Armamos una estrategia simple con calendario mensual centrado en los productos de cada estación.",
    portada: { src: img("deleite-3"), alt: "Taza de café y rebanada de pan dulce con pasas sobre una bandeja" },
    galeria: [
      { src: img("deleite-3"), alt: "Taza de café y rebanada de pan dulce con pasas sobre una bandeja", formato: "cuadrada" },
      { src: img("deleite-4"), alt: "Leche cayendo en una taza de café rodeada de granos", formato: "cuadrada" },
      { src: img("deleite-1"), alt: "Mostrador de una cafetería con pizarra de menú y máquinas de café", formato: "horizontal" },
    ],
    testimonio: {
      texto: "Pasamos de subir cosas sueltas a tener un plan. Se nota en cómo nos escribe la gente.",
      autor: "Una clienta",
      cargo: "Cafetería de barrio",
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

/** Máximo 3 casos destacados para la home. */
export function getCasosDestacados() {
  return casos.filter((c) => c.destacado).slice(0, 3);
}

/** Casos que incluyen un servicio (en el orden de la lista). */
export function getCasosPorServicio(servicioSlug: string) {
  return casos.filter((c) => c.servicios.includes(servicioSlug));
}
