export type Faq = { pregunta: string; respuesta: string };

export type Servicio = {
  slug: string;
  titulo: string;
  descripcionCorta: string;
  descripcionLarga: string;
  incluye: string[];
  paraQuien: string[];
  faqs: Faq[];
};

export const servicios: Servicio[] = [
  {
    slug: "redes-sociales",
    titulo: "Redes sociales",
    descripcionCorta: "Planificamos, publicamos y medimos para que tu marca tenga presencia real.",
    descripcionLarga:
      "Nos encargamos de tus redes de punta a punta: definimos qué decir, cómo decirlo y cuándo. Vos seguís con tu negocio y nosotros cuidamos tu comunidad como si fuera nuestra.",
    incluye: [
      "Estrategia y línea editorial a medida",
      "Calendario mensual de publicaciones",
      "Diseño y edición de posteos, reels y stories",
      "Publicación y atención de mensajes y comentarios",
      "Reporte mensual con lo que funcionó y lo que ajustamos",
    ],
    paraQuien: [
      "Negocios que publican “cuando se puede” y quieren constancia",
      "Emprendimientos que están arrancando y necesitan una voz clara",
      "Marcas que ya tienen comunidad y quieren aprovecharla mejor",
    ],
    faqs: [
      {
        pregunta: "¿Tengo que pasarles el contenido?",
        respuesta:
          "No hace falta. Si tenés material, lo usamos; si no, lo producimos nosotros con el servicio de contenido o fotografía.",
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
    titulo: "Diseño gráfico",
    descripcionCorta: "Piezas que se ven bien y dicen lo que tu marca quiere decir.",
    descripcionLarga:
      "Diseñamos las piezas que tu marca necesita para verse consistente, en redes y fuera de ellas. Menos adorno, más claridad y personalidad.",
    incluye: [
      "Piezas para redes (posteos, historias, portadas)",
      "Flyers, folletos y cartelería",
      "Adaptaciones de tu identidad visual",
      "Plantillas editables para que mantengas el estilo",
      "Archivos listos para imprimir o publicar",
    ],
    paraQuien: [
      "Negocios que ya tienen logo pero no una imagen coherente",
      "Marcas que lanzan una promo, un evento o un producto nuevo",
      "Quienes necesitan material gráfico sin depender de plantillas genéricas",
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
    titulo: "Contenido",
    descripcionCorta: "Ideas, guiones y piezas alineadas a tu marca y a tu mensaje.",
    descripcionLarga:
      "Creamos contenido pensado para tu público: desde la idea hasta la pieza terminada. Todo con el tono de tu marca y con un objetivo claro detrás.",
    incluye: [
      "Ideación de contenido y guiones",
      "Producción de reels y videos cortos",
      "Textos y copies con el tono de tu marca",
      "Jornadas de producción (día de contenido)",
      "Edición y entrega lista para publicar",
    ],
    paraQuien: [
      "Marcas que no saben qué publicar ni cómo contarlo",
      "Negocios con productos o servicios que merecen mostrarse mejor",
      "Quienes quieren juntar contenido para varias semanas en una sola jornada",
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
    titulo: "Fotografía",
    descripcionCorta: "Fotos de producto y de marca que muestran lo mejor de tu negocio.",
    descripcionLarga:
      "Fotografiamos tus productos, tu espacio y tu equipo para que tu marca se vea profesional y cercana al mismo tiempo.",
    incluye: [
      "Fotografía de producto",
      "Fotos de local, equipo y ambiente",
      "Dirección de arte y armado de escenas",
      "Edición y retoque de las imágenes",
      "Entrega en formatos para web y redes",
    ],
    paraQuien: [
      "Negocios con productos que necesitan buenas fotos para vender",
      "Marcas que quieren renovar su banco de imágenes",
      "Quienes preparan un catálogo o una nueva web",
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
    titulo: "Catálogos",
    descripcionCorta: "Catálogos claros y bien diseñados para mostrar y vender tus productos.",
    descripcionLarga:
      "Armamos catálogos digitales o impresos que ordenan tu oferta y facilitan que tus clientes elijan. Con fotos, textos y diseño alineados a tu marca.",
    incluye: [
      "Relevamiento y orden de tus productos",
      "Fotografía de los productos",
      "Diseño del catálogo (digital y/o imprimible)",
      "Textos descriptivos claros",
      "Versión lista para compartir por WhatsApp y redes",
    ],
    paraQuien: [
      "Negocios con muchos productos que cuesta mostrar",
      "Quienes venden por WhatsApp y necesitan algo prolijo para enviar",
      "Empresas que alquilan o venden y quieren una carta de presentación",
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
        respuesta: "Podemos usar tus fotos o hacerlas nosotros con el servicio de fotografía.",
      },
    ],
  },
];

export function getServicio(slug: string) {
  return servicios.find((s) => s.slug === slug);
}
