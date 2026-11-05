import { NextResponse, type NextRequest } from "next/server";
import { casos } from "@/content/casos";
import { servicios } from "@/content/servicios";

// Slugs válidos de las rutas dinámicas. Con cacheComponents no se puede usar dynamicParams = false, y en la primera
// visita de un slug desconocido la página empezaba a enviarse con 200 antes de llegar a notFound().
// Acá se corta antes de renderizar: un slug inexistente responde 404 real desde la primera visita.
const validos: Record<string, Set<string>> = {
  servicios: new Set(servicios.map((s) => s.slug)),
  trabajos: new Set(casos.map((c) => c.slug)), // respeta SHOW_DEMO_CASES
};

export function proxy(request: NextRequest) {
  const [, seccion, slug] = request.nextUrl.pathname.split("/");
  if (slug && !validos[seccion]?.has(slug)) {
    // /404 no existe como ruta: se muestra app/not-found.tsx con estado 404
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/servicios/:slug", "/trabajos/:slug"],
};
