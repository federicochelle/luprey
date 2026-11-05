import { esProduccion } from "@/content/site";

/**
 * Franja fina arriba de todo mientras el sitio no esté en producción (NEXT_PUBLIC_SITE_ENV).
 * Es fija y el header baja 2rem (ver Header y PageMain), así que no rompe el header transparente.
 */
export function PreviewBanner() {
  if (esProduccion) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center bg-oliva px-3 text-center text-xs font-bold tracking-wide text-crema">
      <p className="truncate">Versión preliminar · Algunos trabajos y clientes son de ejemplo</p>
    </div>
  );
}
