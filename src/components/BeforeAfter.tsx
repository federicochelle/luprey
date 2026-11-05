"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { AntesDespues } from "@/content/casos";

/**
 * Comparador antes/después. Un <input type="range"> (invisible) cubre la imagen: se arrastra con mouse o dedo
 * y se controla con el teclado (flechas, Inicio/Fin). El foco se ve con un contorno alrededor.
 */
export function BeforeAfter({ antes, despues, alt }: AntesDespues) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className="relative mt-12 aspect-[4/3] max-w-4xl select-none overflow-hidden rounded-2xl has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-tone-fg sm:aspect-[16/10]">
      <Image src={despues} alt={`${alt} (después)`} fill sizes="(min-width: 1152px) 896px, 100vw" className="object-cover" />
      {/* "Antes" se recorta desde la derecha hasta la posición del control */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={antes} alt={`${alt} (antes)`} fill sizes="(min-width: 1152px) 896px, 100vw" className="object-cover" />
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wide text-crema">Antes</span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-wide text-crema">Después</span>

      {/* Línea y manija */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-crema" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-crema bg-black/60 text-xs text-crema">
          ◂▸
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Comparar antes y después
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`Se ve ${pos}% de la imagen del antes`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
