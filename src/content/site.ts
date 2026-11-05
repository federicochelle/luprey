// Datos generales del sitio. Todo lo que diga [COMPLETAR] falta cargarlo.

export const site = {
  nombre: "Luprey",
  tagline: "Estrategia + contenido + cercanía.",
  descripcion:
    "Luprey es una agencia de marketing de Mercedes, Soriano. Nos metemos en tu marca como si fuera nuestra: estrategia, contenido y redes con cercanía.",
  // Dominio final: definilo en NEXT_PUBLIC_SITE_URL (ej. https://tudominio.com.uy)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  whatsapp: {
    numero: "[COMPLETAR]", // formato internacional sin + ni espacios, ej. 598XXXXXXXX
    mostrar: "[COMPLETAR]", // como se ve en pantalla, ej. 09X XXX XXX
    mensaje: "Hola Luprey! Quiero hablar sobre mi marca.",
  },
  email: "[COMPLETAR]",
  instagram: {
    usuario: "@luprey.agenciademarketing",
    url: "https://www.instagram.com/luprey.agenciademarketing/",
  },
  ubicacion: {
    ciudad: "Mercedes",
    departamento: "Soriano",
    pais: "Uruguay",
    direccion: "[COMPLETAR]",
  },

  menu: [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Trabajos", href: "/trabajos" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
} as const;

export function whatsappUrl(mensaje: string = site.whatsapp.mensaje) {
  const digitos = site.whatsapp.numero.replace(/\D/g, "");
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensaje)}`;
}

export function emailUrl() {
  return `mailto:${site.email}`;
}
