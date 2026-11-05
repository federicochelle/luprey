"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { ImagenGaleria } from "@/content/casos";
import { cn } from "@/lib/cn";

const botonLightbox =
  "flex size-11 items-center justify-center rounded-full border border-crema/40 bg-black/50 text-crema transition-colors hover:bg-black/80";

/**
 * Galería en mosaico + lightbox con <dialog> (mismas animaciones que el modal de WhatsApp).
 * Flechas del teclado y botones, Escape, clic en el margen y swipe en mobile. El foco vuelve a la miniatura.
 */
export function CaseGallery({ imagenes }: { imagenes: ImagenGaleria[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toqueX = useRef<number | null>(null);
  const [indice, setIndice] = useState(0);
  const total = imagenes.length;

  const abrir = (i: number) => {
    setIndice(i);
    dialogRef.current?.showModal();
  };
  const cerrar = () => dialogRef.current?.close();
  const ir = (delta: number) => setIndice((i) => (i + delta + total) % total);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowLeft") ir(-1);
    if (e.key === "ArrowRight") ir(1);
  };
  const onTouchStart = (e: TouchEvent) => {
    toqueX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (toqueX.current === null) return;
    const dx = e.changedTouches[0].clientX - toqueX.current;
    toqueX.current = null;
    if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1); // deslizar a la izquierda = siguiente
  };

  const actual = imagenes[indice];

  return (
    <>
      <div className="mosaico-wrap mt-12">
        <ul className="mosaico">
          {imagenes.map((img, i) => {
            const formato = img.formato ?? "horizontal";
            return (
              <li key={`${img.src}-${i}`} className={cn(formato === "horizontal" && "mosaico-horizontal", formato === "vertical" && "mosaico-vertical")}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Ampliar imagen: ${img.alt}`}
                  onClick={() => abrir(i)}
                  className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={formato === "horizontal" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Galería de imágenes"
        data-tone="carbon"
        onKeyDown={onKeyDown}
        className="wa-dialog lightbox m-0 h-dvh max-h-none w-dvw max-w-none bg-black/90 p-0 text-crema"
      >
        <div
          className="relative flex h-full w-full touch-pan-y items-center justify-center p-4 sm:p-14"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          // Clic en el margen oscuro (fuera de la imagen y de los botones) cierra
          onClick={(e) => {
            if (e.target === e.currentTarget) cerrar();
          }}
        >
          <button type="button" onClick={cerrar} className={cn(botonLightbox, "absolute right-3 top-3 z-10 sm:right-5 sm:top-5")}>
            <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
            <span className="sr-only">Cerrar galería</span>
          </button>

          {total > 1 && (
            <>
              <button type="button" onClick={() => ir(-1)} className={cn(botonLightbox, "absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-5")}>
                <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={1.5} />
                <span className="sr-only">Imagen anterior</span>
              </button>
              <button type="button" onClick={() => ir(1)} className={cn(botonLightbox, "absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-5")}>
                <ChevronRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
                <span className="sr-only">Imagen siguiente</span>
              </button>
            </>
          )}

          <div key={indice} className="lightbox-img relative h-full w-full">
            <Image src={actual.src} alt={actual.alt} fill sizes="100vw" className="object-contain" />
          </div>

          <p aria-live="polite" className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-sm">
            {indice + 1} / {total}
          </p>
        </div>
      </dialog>
    </>
  );
}
