// Configuración de los trazos decorativos (ver components/Trazo.tsx).

/**
 * Interruptor general de los trazos decorativos. En false no se renderiza ninguno en todo el sitio
 * (las colocaciones quedan en el código, listas para volver a activarse poniendo true).
 * La página de prueba /dev/trazos los muestra igual.
 */
export const MOSTRAR_TRAZOS = false;

/**
 * Variante "original": la línea de public/images/luprey-linea.svg, tal cual (con fade-in en lugar de dibujado).
 * TODO: ese archivo todavía no está en el proyecto. Cuando esté, pegar acá su viewBox y el atributo d de su path,
 * por ejemplo: { viewBox: "0 0 460 345", d: "M ..." }
 */
export const LINEA_ORIGINAL: { viewBox: string; d: string } | null = null;

export const LINEA_ORIGINAL_DISPONIBLE = LINEA_ORIGINAL !== null;
