import { CalendarDays, Camera, Clapperboard, MonitorSmartphone, PenTool, Share2, type LucideIcon } from "lucide-react";

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
        // [COMPLETAR] confirmar la frecuencia de publicación por plan
        respuesta:
          "Depende de lo que necesite tu marca y de en qué redes quieras estar. Lo definimos juntas en la estrategia, para publicar con constancia y sin saturar.",
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
      "Diseñamos las piezas que tu marca necesita para verse igual de bien en redes, en la vidriera y en la mano de tu cliente, incluidos catálogos digitales o imprimibles. Si ya tenés logo pero cada cosa sale distinta, ordenamos tu imagen para que se reconozca de una.",
    incluye: [
      "Piezas para redes (posteos, historias, portadas)",
      "Flyers, folletos y cartelería",
      "Adaptaciones de tu identidad visual",
      "Plantillas editables para que mantengas el estilo",
      "Catálogos (digitales o imprimibles)",
      "Archivos listos para imprimir o publicar",
    ],
    faqs: [
      {
        pregunta: "¿Hacen logos e identidad de marca?",
        // [COMPLETAR] confirmar si el desarrollo de identidad completa forma parte del servicio
        respuesta:
          "Trabajamos a partir de tu identidad actual y la ordenamos para que se use igual en todos lados. Si todavía no tenés una, lo charlamos y vemos cómo encararla.",
      },
      {
        pregunta: "¿Me entregan los archivos editables?",
        // [COMPLETAR] definir qué formatos se entregan en cada trabajo
        respuesta:
          "Sí, te dejamos las piezas listas para usar y, cuando corresponde, plantillas editables para que mantengas el estilo por tu cuenta.",
      },
      {
        pregunta: "¿Cuántas correcciones incluye?",
        // [COMPLETAR] definir la cantidad de rondas de ajustes por pieza
        respuesta:
          "Incluimos ajustes sobre cada pieza hasta que quede como querés. Lo acordamos al empezar para que todo sea claro.",
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
        // [COMPLETAR] definir plazos habituales de edición y entrega
        respuesta:
          "Depende de la cantidad de piezas. Antes de empezar te contamos los tiempos para que puedas planificar tus publicaciones.",
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
        // [COMPLETAR] definir la cantidad de fotos editadas por sesión
        respuesta:
          "Depende del tipo de sesión y de lo que necesites mostrar. Lo definimos antes de producir, así sabés qué vas a recibir.",
      },
      {
        pregunta: "¿Puedo usar las fotos donde quiera?",
        // [COMPLETAR] definir condiciones de uso y derechos de las imágenes
        respuesta:
          "Las imágenes son para que las uses en tu comunicación: redes, web, catálogos e impresos. Si necesitás otro uso, lo conversamos.",
      },
    ],
  },
  {
    slug: "eventos-empresariales",
    icon: CalendarDays,
    // Provisoria: copia de catalogos.jpg. TODO: reemplazar por una foto de eventos
    image: "/images/servicios/eventos-empresariales.jpg",
    titulo: "Eventos empresariales",
    descripcionCorta: "Organización de lanzamientos, presentaciones y encuentros corporativos, de principio a fin.",
    // TODO: revisar con clientas (descripción, incluye y FAQs)
    descripcionLarga:
      "Organizamos eventos empresariales de principio a fin: lanzamientos, presentaciones, aniversarios y encuentros corporativos. Nos ocupamos de la planificación, la comunicación y cada detalle, para que tu marca se luzca y vos solo tengas que disfrutar.",
    incluye: [
      "Planificación y cronograma del evento",
      "Búsqueda y coordinación de espacio y proveedores",
      "Diseño de invitaciones y piezas gráficas",
      "Comunicación y difusión previa en redes",
      "Coordinación y producción el día del evento",
    ],
    faqs: [
      {
        pregunta: "¿Qué tipos de eventos organizan?",
        respuesta:
          "Lanzamientos, presentaciones, aniversarios y encuentros corporativos. Si tenés otra idea, la charlamos.",
      },
      {
        pregunta: "¿Se ocupan de todo o solo de una parte?",
        respuesta:
          "Podemos hacernos cargo de todo el evento o de las partes que necesites. Lo definimos juntas al empezar.",
      },
      {
        pregunta: "¿Con cuánta anticipación tengo que contactarlas?",
        respuesta: "Cuanto antes, mejor. Según el tipo de evento, lo ideal es escribirnos con unas semanas de margen.",
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
        // [COMPLETAR] confirmar plazos reales según el tamaño del proyecto
        respuesta:
          "Depende del tamaño del proyecto. Te pasamos un plazo concreto después de conocer tu negocio.",
      },
      {
        pregunta: "¿Voy a poder actualizar el contenido yo?",
        // [COMPLETAR] definir si el sitio incluye edición autónoma o si las actualizaciones las hace Luprey
        respuesta:
          "Lo pensamos según cómo trabajes. Podés encargarnos las actualizaciones o dejar partes del sitio listas para que las cambies vos; lo definimos juntas.",
      },
      {
        pregunta: "¿Incluye dominio y hosting?",
        // [COMPLETAR] definir qué se incluye y cómo se gestionan el dominio y el hosting
        respuesta:
          "Te ayudamos a elegir, configurar y publicar el sitio con tu dominio. Te explicamos qué necesitás para mantenerlo en línea.",
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
