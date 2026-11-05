"use client";

import { useEffect, useRef, useState } from "react";
import { LINEA_ORIGINAL, MOSTRAR_TRAZOS } from "@/content/trazos";
import { cn } from "@/lib/cn";

export type TrazoVariant = "original" | "gancho" | "lazo" | "ola" | "espiral" | "hilo";
/** Esquina de la sección donde se ancla el trazo (se espeja desde la esquina arriba-izquierda). */
export type TrazoPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type TrazoProps = {
  variant: TrazoVariant;
  position: TrazoPosition;
  /** En mobile: "oculto" (por defecto) o "chico" (~60%). Ocultalo donde pueda tapar contenido. */
  mobile?: "oculto" | "chico";
  /** Capa (z-index). Por defecto detrás del contenido de una sección con isolate. */
  zClass?: string;
  className?: string;
  /** Mostrarlo aunque MOSTRAR_TRAZOS esté en false (lo usa la página de prueba) */
  forzar?: boolean;
};

// Trazos dibujados a mano en un marco de 460x345, pensados para la esquina arriba-izquierda:
// los extremos quedan fuera del marco (-20), sobre sus bordes izquierdo y/o superior. Con espejos sirven
// para las 4 esquinas. Cada uno es un recorrido largo y suelto, con a lo sumo un rulo.
const PATHS: Record<Exclude<TrazoVariant, "original">, string> = {
  // baja desde arriba, hace un rulo y sale por el costado
  gancho:
    "M 150 -20 C 160 60, 150 130, 215 160 C 275 188, 340 150, 322 100 C 305 52, 235 70, 240 118 C 245 160, 200 215, 120 230 C 70 240, 20 270, -20 300",
  // cruza en diagonal con un lazo en el medio
  lazo: "M -20 330 C 80 310, 150 250, 195 200 C 235 155, 285 160, 280 205 C 275 245, 215 225, 232 175 C 250 120, 330 120, 380 60 C 405 30, 425 5, 450 -20",
  // entra por un costado, dos curvas amplias y sale por el borde opuesto, sin rulo (anclada abajo, sale por abajo)
  ola: "M -20 200 C 70 150, 140 270, 230 220 C 310 175, 270 70, 340 20 C 365 2, 380 -10, 395 -20",
  // entra, hace un rulo apretado y vuelve a salir por el mismo borde
  espiral:
    "M 160 -20 C 170 70, 215 150, 265 185 C 310 215, 345 170, 315 140 C 290 115, 245 150, 275 195 C 300 232, 345 240, 395 180 C 425 143, 430 60, 440 -20",
  // larga y casi recta, una curva suave y un rulo chico al final
  hilo: "M -20 285 C 80 270, 180 275, 260 240 C 330 208, 360 160, 380 130 C 395 106, 365 80, 350 100 C 338 118, 375 130, 400 100 C 420 75, 430 30, 440 -20",
};

const POSICION: Record<TrazoPosition, string> = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0 -scale-x-100",
  "bottom-left": "bottom-0 left-0 -scale-y-100",
  "bottom-right": "bottom-0 right-0 -scale-100",
};

/**
 * Trazo decorativo orgánico para el borde de una sección. Usar dentro de una sección con
 * "relative isolate overflow-hidden": queda detrás del contenido, sin capturar clics, y la sección recorta lo que sale.
 * Trazo grueso tipo marcador (12 px en desktop, proporcional en mobile), 90% de opacidad, color currentColor del
 * token de tono (carbón sobre crema, crema sobre carbón). Se dibuja una sola vez al entrar en pantalla
 * (la variante "original" hace fade-in); con prefers-reduced-motion aparece directo.
 */
export function Trazo({ variant, position, mobile = "oculto", zClass = "-z-10", className, forzar }: TrazoProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const seccion = ref.current?.closest("section");
    if (!seccion) return;
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true);
          observer.disconnect(); // una sola vez
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(seccion);
    return () => observer.disconnect();
  }, []);

  if (!MOSTRAR_TRAZOS && !forzar) return null; // apagados desde content/trazos.ts

  const esOriginal = variant === "original";
  if (esOriginal && !LINEA_ORIGINAL) return null; // todavía no está el archivo de la línea original

  return (
    <svg
      ref={ref}
      viewBox={esOriginal ? LINEA_ORIGINAL!.viewBox : "0 0 460 345"}
      fill="none"
      stroke="currentColor"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-visto={visto}
      data-modo={esOriginal ? "fade" : "dibujo"}
      className={cn(
        "trazo pointer-events-none absolute h-auto w-[280px] overflow-visible text-tone-fg opacity-90 md:w-[460px]",
        zClass,
        POSICION[position],
        mobile === "oculto" && "max-md:hidden",
        className,
      )}
    >
      {/* pathLength=1 normaliza el largo: el dibujado (dasharray/dashoffset) no depende del tamaño del trazo */}
      <path d={esOriginal ? LINEA_ORIGINAL!.d : PATHS[variant]} pathLength={1} />
    </svg>
  );
}
