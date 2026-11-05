import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata: Metadata = { title: "Página no encontrada" };

/**
 * 404 del sitio. Es una sección oscura a pantalla casi completa: funciona tanto con el header sólido como
 * con el transparente (por ejemplo en /trabajos/<slug-inexistente>, donde el header arranca transparente).
 */
export default function NotFound() {
  return (
    <section data-tone="carbon" aria-labelledby="404-titulo" className="flex min-h-[85vh] items-center py-32">
      <Container>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">Error 404</p>
        <h1 id="404-titulo" className="mt-4 max-w-3xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Esta página no existe
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tone-accent">
          Puede que el link esté mal escrito o que la página haya cambiado de lugar. Volvé al inicio o mirá lo que hacemos.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Ir al inicio</Button>
          <Button href="/servicios" variant="outline">
            Ver servicios
          </Button>
        </div>
      </Container>
    </section>
  );
}
