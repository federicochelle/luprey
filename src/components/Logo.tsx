import Link from "next/link";
import { LogoMark } from "./LogoMark";

/**
 * Logo "Luprey." como link al inicio. El color lo da el texto del contenedor (currentColor):
 * en el header cambia junto con el navbar (crema transparente -> carbón sólido) y en el footer es crema.
 */
export function Logo() {
  return (
    <Link href="/" aria-label="Luprey, ir al inicio" className="inline-block">
      <LogoMark className="h-7 w-auto sm:h-8" />
    </Link>
  );
}
