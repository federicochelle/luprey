// Datos generales del sitio. Todo lo que diga [COMPLETAR] falta cargarlo.

export type Contacto = {
  id: string;
  nombre: string;
  ciudad: string;
  /** Como se muestra en pantalla */
  telefono: string;
  /** Formato internacional sin + ni espacios (para wa.me) */
  whatsapp: string;
};

/**
 * Entorno del sitio. Solo "production" es indexable: en cualquier otro valor (o sin definir) el sitio se trata
 * como preview: robots.txt lo bloquea y las páginas llevan noindex, nofollow.
 */
export const esProduccion = process.env.NEXT_PUBLIC_SITE_ENV === "production";

import { SHOW_TRABAJOS } from "@/lib/config";

export const site = {
  nombre: "Luprey",
  tagline: "Estrategia + contenido + cercanía.",
  descripcion:
    "Luprey es una agencia de marketing. Construimos marcas que comunican mejor: estrategia, contenido y cercanía.",
  // Dominio final: definilo en NEXT_PUBLIC_SITE_URL (ej. https://tudominio.com.uy)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Dos socias, dos ciudades
  contactos: [
    {
      id: "mercedes",
      nombre: "Sofía Pérez",
      ciudad: "Mercedes",
      telefono: "091 614 708",
      whatsapp: "59891614708",
    },
    {
      id: "fray-bentos",
      nombre: "Sofía Giurgi",
      ciudad: "Fray Bentos",
      telefono: "099 985 561",
      whatsapp: "59899985561",
    },
  ] satisfies Contacto[],
  mensajeWhatsapp: "Hola Luprey! Quiero hablar sobre mi marca.",

  // TODO: confirmar email real con Luprey
  email: "hola@luprey.com.uy",
  instagram: {
    usuario: "@luprey.agenciademarketing",
    url: "https://www.instagram.com/luprey.agenciademarketing/",
  },
  ubicacion: {
    ciudades: ["Mercedes", "Fray Bentos"],
    pais: "Uruguay",
    texto: "Mercedes y Fray Bentos, Uruguay",
  },

  menu: [
    { label: "Servicios", href: "/servicios" },
    ...(SHOW_TRABAJOS ? [{ label: "Trabajos", href: "/trabajos" }] : []),
    { label: "Nosotras", href: "/nosotras" },
    { label: "Contacto", href: "/contacto" },
  ],
};

/**
 * Páginas con hero oscuro: el header arranca transparente (logo claro, links crema) y el contenido sube detrás de él.
 * Para sumar una página, agregá su ruta exacta a `exactas` o un prefijo a `prefijos` (ej. "/trabajos/" = solo las de detalle).
 */
export const headerTransparente = {
  exactas: ["/"],
  prefijos: ["/trabajos/"],
};

export function tieneHeaderTransparente(pathname: string) {
  return (
    headerTransparente.exactas.includes(pathname) ||
    headerTransparente.prefijos.some((prefijo) => pathname.startsWith(prefijo))
  );
}

export function whatsappUrl(contacto: Pick<Contacto, "whatsapp">, mensaje: string = site.mensajeWhatsapp) {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function emailUrl() {
  return `mailto:${site.email}`;
}
