// Contenido de /nosotros. Lo marcado [REVISAR] es un borrador a confirmar.
export const nosotros = {
  // Primera sección de la página: lleva el h1
  queEs: {
    titulo: "Somos Luprey.",
    texto:
      "Somos una agencia de marketing que acompaña a negocios y marcas que quieren comunicar mejor. Pensamos la estrategia, creamos el contenido y estamos en el día a día de cada marca. Trabajamos desde Mercedes y Fray Bentos. [REVISAR]",
    imagen: "/images/nosotros/que-es.jpg",
  },
  pensamos: [
    {
      titulo: "No todo se vende con un post.",
      texto: "Hay rubros que necesitan tiempo, estrategia y presencia constante. Nosotras trabajamos para eso.",
      imagen: "/images/nosotros/pensamos-1.jpg",
    },
    {
      titulo: "Subir contenido sin pensar no es estrategia.",
      texto: "Es solo ruido. Y el ruido no construye marcas.",
      imagen: "/images/nosotros/pensamos-2.jpg",
    },
    {
      titulo: "Estar en redes no es suficiente.",
      texto: "La diferencia está en cómo mostrás lo que hacés. Ahí es donde trabajamos.",
      imagen: "/images/nosotros/pensamos-3.jpg",
    },
    {
      titulo: "Estamos. Y se nota.",
      texto: "Respondemos. Nos involucramos. Y estamos cuando hace falta.",
      imagen: "/images/nosotros/pensamos-4.jpg",
    },
  ],
  equipo: {
    titulo: "Las caras detrás de Luprey",
    // `contacto` es el id en site.contactos (para el botón de WhatsApp directo)
    integrantes: [
      { nombre: "Sofía Pérez", ciudad: "Mercedes", contacto: "mercedes", imagen: "/images/equipo/sofia-perez.svg" },
      { nombre: "Sofía Giurgi", ciudad: "Fray Bentos", contacto: "fray-bentos", imagen: "/images/equipo/sofia-giurgi.svg" },
    ],
  },
  cierre: {
    titulo: "No es solo lo que hacemos. Es cómo lo hacemos.",
    bajada: "Si a nuestros clientes les va bien, a nosotras también.",
    imagen: "/images/hero/hero-3.jpg",
  },
};
