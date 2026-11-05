import { BookOpen, Camera, Clapperboard, MonitorSmartphone, PenTool, Share2, type LucideIcon } from "lucide-react";

export type Faq = { pregunta: string; respuesta: string };

export type Servicio = {
  slug: string;
  icon: LucideIcon;
  /** Ruta en /public/images/servicios/ */
  image: string;
  titulo: string;
  descripcionCorta: string;
  descripcionLarga: string;
  incluye: string[];
  faqs: Faq[];
};

export const servicios: Servicio[] = [
  {
    slug: "redes-sociales",
    icon: Share2,
    image: "/images/servicios/redes-sociales.jpg",
    titulo: "Redes sociales",
    descripcionCorta: "Planificamos, publicamos y medimos para que tu marca tenga presencia real.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Nos encargamos de tus redes de punta a punta: pensamos qué decir, cómo decirlo y cuándo, y lo publicamos por vos. Es para negocios que hoy suben cosas cuando pueden y quieren una presencia constante, con voz propia. Lo que ganás es una comunidad que te conoce, te responde y te recuerda.",
    incluye: [
      "Estrategia y línea editorial a medida",
      "Calendario mensual de publicaciones",
      "Diseño y edición de posteos, reels y stories",
      "Publicación y atención de mensajes y comentarios",
      "Reporte mensual con lo que funcionó y lo que ajustamos",
    ],
    faqs: [
      {
        pregunta: "¿Tengo que pasarles el contenido?",
        respuesta:
          "No hace falta. Si tenés material, lo usamos; si no, lo producimos nosotras con el servicio de contenido o fotografía.",
      },
      {
        pregunta: "¿Cuántas publicaciones por semana incluye?",
        respuesta: "[COMPLETAR] Depende del plan y de lo que necesite tu marca. Lo definimos juntos en la estrategia.",
      },
      {
        pregunta: "¿Cómo sé si está funcionando?",
        respuesta:
          "Te mandamos un reporte mensual claro, sin tecnicismos, con los números que importan y los ajustes que vamos a hacer.",
      },
    ],
  },
  {
    slug: "diseno-grafico",
    icon: PenTool,
    image: "/images/servicios/diseno-grafico.jpg",
    titulo: "Diseño gráfico",
    descripcionCorta: "Piezas que se ven bien y dicen lo que tu marca quiere decir.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Diseñamos las piezas que tu marca necesita para verse igual de bien en redes, en la vidriera y en la mano de tu cliente. Si ya tenés logo pero cada cosa sale distinta, ordenamos tu imagen para que se reconozca de una.",
    incluye: [
      "Piezas para redes (posteos, historias, portadas)",
      "Flyers, folletos y cartelería",
      "Adaptaciones de tu identidad visual",
      "Plantillas editables para que mantengas el estilo",
      "Archivos listos para imprimir o publicar",
    ],
    faqs: [
      {
        pregunta: "¿Hacen logos e identidad de marca?",
        respuesta: "[COMPLETAR] Confirmar si el desarrollo de identidad completa forma parte del servicio.",
      },
      {
        pregunta: "¿Me entregan los archivos editables?",
        respuesta: "[COMPLETAR] Definir qué formatos se entregan en cada trabajo.",
      },
      {
        pregunta: "¿Cuántas correcciones incluye?",
        respuesta: "[COMPLETAR] Definir la cantidad de rondas de ajustes por pieza.",
      },
    ],
  },
  {
    slug: "contenido",
    icon: Clapperboard,
    image: "/images/servicios/contenido.jpg",
    titulo: "Contenido",
    descripcionCorta: "Ideas, guiones y piezas alineadas a tu marca y a tu mensaje.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Pensamos y producimos el contenido de tu marca, desde la idea hasta la pieza lista para publicar. Es para negocios que tienen mucho para mostrar pero no saben por dónde empezar. En una sola jornada te llevás material para varias semanas, siempre con el tono de tu marca.",
    incluye: [
      "Ideación de contenido y guiones",
      "Producción de reels y videos cortos",
      "Textos y copies con el tono de tu marca",
      "Jornadas de producción (día de contenido)",
      "Edición y entrega lista para publicar",
    ],
    faqs: [
      {
        pregunta: "¿Qué es un día de contenido?",
        respuesta:
          "Es una jornada en la que producimos fotos y videos en tu local o donde lo necesites, para tener material para varias semanas.",
      },
      {
        pregunta: "¿Dónde se graba?",
        respuesta: "En tu negocio, en el lugar que mejor muestre lo que hacés. Lo coordinamos con vos antes.",
      },
      {
        pregunta: "¿Cuánto tarda la entrega?",
        respuesta: "[COMPLETAR] Definir plazos habituales de edición y entrega.",
      },
    ],
  },
  {
    slug: "fotografia",
    icon: Camera,
    image: "/images/servicios/fotografia.jpg",
    titulo: "Fotografía",
    descripcionCorta: "Fotos de producto y de marca que muestran lo mejor de tu negocio.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Fotografiamos tus productos, tu espacio y a tu equipo para que tu marca se vea profesional sin perder cercanía. Es para negocios que venden con imágenes y hoy tienen fotos que no los representan. Ganás un banco de imágenes propio, listo para usar en redes, web y catálogo.",
    incluye: [
      "Fotografía de producto",
      "Fotos de local, equipo y ambiente",
      "Dirección de arte y armado de escenas",
      "Edición y retoque de las imágenes",
      "Entrega en formatos para web y redes",
    ],
    faqs: [
      {
        pregunta: "¿Llevan su propio equipo?",
        respuesta: "Sí, nos encargamos del equipo y de la preparación. Vos solo tenés que mostrarnos qué querés destacar.",
      },
      {
        pregunta: "¿Cuántas fotos entregan?",
        respuesta: "[COMPLETAR] Definir cantidad de fotos editadas por sesión.",
      },
      {
        pregunta: "¿Puedo usar las fotos donde quiera?",
        respuesta: "[COMPLETAR] Definir condiciones de uso y derechos de las imágenes.",
      },
    ],
  },
  {
    slug: "catalogos",
    icon: BookOpen,
    image: "/images/servicios/catalogos.jpg",
    titulo: "Catálogos",
    descripcionCorta: "Catálogos claros y bien diseñados para mostrar y vender tus productos.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Armamos catálogos, digitales o impresos, que ordenan tu oferta y le hacen fácil la elección a tu cliente. Es para quienes tienen muchos productos o venden por WhatsApp y hoy mandan fotos sueltas. Ganás una carta de presentación prolija que se comparte en un toque y deja claro qué ofrecés.",
    incluye: [
      "Relevamiento y orden de tus productos",
      "Fotografía de los productos",
      "Diseño del catálogo (digital y/o imprimible)",
      "Textos descriptivos claros",
      "Versión lista para compartir por WhatsApp y redes",
    ],
    faqs: [
      {
        pregunta: "¿Se puede actualizar cuando cambian los productos?",
        respuesta: "[COMPLETAR] Definir si se ofrecen actualizaciones y cómo se coordinan.",
      },
      {
        pregunta: "¿Es digital o impreso?",
        respuesta: "Puede ser ambos. Lo pensamos según cómo lo vayas a usar.",
      },
      {
        pregunta: "¿Incluye las fotos?",
        respuesta: "Podemos usar tus fotos o hacerlas nosotras con el servicio de fotografía.",
      },
    ],
  },
  {
    slug: "desarrollo-web",
    icon: MonitorSmartphone,
    image: "/images/servicios/desarrollo-web.jpg",
    titulo: "Desarrollo web",
    descripcionCorta: "Sitios rápidos, modernos y pensados para convertir visitas en clientes.",
    // [REVISAR] texto del hero, borrador a confirmar con Luprey
    descripcionLarga:
      "Diseñamos y desarrollamos sitios web rápidos, que se ven bien en cualquier pantalla y llevan a la gente a escribirte. Es para marcas que hoy viven solo en redes o tienen una web vieja que no trae consultas. Como ya conocemos tu marca, el sitio sale alineado con tu estrategia y tu contenido: ganás una casa propia en internet que trabaja todo el día.",
    incluye: [
      "Diseño a medida, alineado a tu identidad de marca",
      "Desarrollo rápido y adaptado a celular, tablet y compu",
      "Estructura pensada para convertir (botones de contacto, WhatsApp, formularios)",
      "Textos y contenido integrados con tu estrategia de comunicación",
      "Base de SEO para que te encuentren en Google",
      "Publicación del sitio y acompañamiento después del lanzamiento",
    ],
    faqs: [
      {
        pregunta: "¿Cuánto tarda en estar listo el sitio?",
        respuesta: "[COMPLETAR] Depende del tamaño del proyecto. Te pasamos un plazo concreto después de conocer tu negocio.",
      },
      {
        pregunta: "¿Voy a poder actualizar el contenido yo?",
        respuesta: "[COMPLETAR] Definir si el sitio incluye edición autónoma o si las actualizaciones las hace Luprey.",
      },
      {
        pregunta: "¿Incluye dominio y hosting?",
        respuesta: "[COMPLETAR] Definir qué se incluye y cómo se gestionan el dominio y el hosting.",
      },
      {
        pregunta: "¿Se integra con mis redes y WhatsApp?",
        respuesta: "Sí. Pensamos el sitio junto con tu estrategia, así que conecta con tus redes y con los canales por donde te escriben tus clientes.",
      },
    ],
  },
];

export function getServicio(slug: string) {
  return servicios.find((s) => s.slug === slug);
}
