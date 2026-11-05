"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { InstagramIcon } from "./InstagramIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWhatsAppPicker } from "./WhatsAppPicker";

// Pestaña pegada al borde derecho: redondeada solo a la izquierda. El `-mr-1 pr-1` la extiende 4 px fuera de la
// pantalla, así al desplazarla 4 px a la izquierda en hover no se abre un hueco contra el borde.
const pestana =
  "-mr-1 flex items-center justify-center rounded-l-2xl border-2 border-r-0 border-crema bg-oliva pr-1 text-crema shadow-md transition-transform duration-200 hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0";

/**
 * Pestañas flotantes pegadas al borde derecho: Instagram arriba y WhatsApp abajo (más ancha, sobresale más).
 * Se ocultan mientras haya a la vista:
 * - un formulario (solo debajo de lg, donde ocupa todo el ancho): para no tapar "Enviar";
 * - un bloque marcado con data-ocultar-flotantes (por ejemplo "Siguiente trabajo"): en cualquier tamaño.
 * Los diálogos (modal de WhatsApp, lightbox) usan la capa superior del navegador: siempre quedan por encima.
 */
export function WhatsAppFloat() {
  const { open } = useWhatsAppPicker();
  const pathname = usePathname();
  const [sobreFormulario, setSobreFormulario] = useState(false);
  const [sobreBloque, setSobreBloque] = useState(false);

  useEffect(() => {
    const observar = (selector: string, avisar: (visible: boolean) => void) => {
      const visibles = new Set<Element>();
      const observer = new IntersectionObserver((entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visibles.add(e.target);
          else visibles.delete(e.target);
        }
        avisar(visibles.size > 0);
      });
      document.querySelectorAll(selector).forEach((el) => observer.observe(el));
      return observer;
    };
    const formularios = observar("form", setSobreFormulario);
    const bloques = observar("[data-ocultar-flotantes]", setSobreBloque);
    return () => {
      formularios.disconnect();
      bloques.disconnect();
      // al cambiar de página se vuelven a mostrar
      setSobreFormulario(false);
      setSobreBloque(false);
    };
  }, [pathname]);

  return (
    <div
      data-oculto={sobreFormulario}
      data-oculto-siempre={sobreBloque}
      className={cn(
        // z-40: por debajo del header (y del menú móvil abierto); los diálogos van en la capa superior del navegador
        "fixed right-0 z-40 flex flex-col items-end gap-3 transition-[opacity,translate] duration-200",
        "bottom-5 sm:bottom-8", // misma altura que tenían los botones flotantes
        // Debajo de lg el formulario ocupa todo el ancho: mientras está a la vista se ocultan para no tapar "Enviar"
        "max-lg:data-[oculto=true]:pointer-events-none max-lg:data-[oculto=true]:translate-y-3 max-lg:data-[oculto=true]:opacity-0",
        "data-[oculto-siempre=true]:pointer-events-none data-[oculto-siempre=true]:translate-y-3 data-[oculto-siempre=true]:opacity-0",
      )}
    >
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Luprey (se abre en una pestaña nueva)"
        className={cn(pestana, "h-11 w-12 lg:h-[52px] lg:w-14")}
      >
        <InstagramIcon className="size-5 lg:size-6" strokeWidth={1.5} />
      </a>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => open()}
        aria-label="Escribinos por WhatsApp"
        className={cn(pestana, "h-11 w-16 lg:h-[52px] lg:w-[76px]")}
      >
        <WhatsAppIcon className="size-6 lg:size-7" />
      </button>
    </div>
  );
}
