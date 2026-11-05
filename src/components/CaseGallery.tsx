"use client";

import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import type { ElementoGaleria, ImagenGaleria } from "@/content/casos";
import { cn } from "@/lib/cn";

const botonLightbox =
  "flex size-11 items-center justify-center rounded-full border border-crema/40 bg-black/50 text-crema transition-colors hover:bg-black/80";

const botonReel =
  "flex size-10 items-center justify-center rounded-full border border-crema/40 bg-black/55 text-crema transition-colors hover:bg-black/80";

/**
 * Un reel dentro del mosaico: video vertical que llena su casillero, muted y en loop. Se reproduce solo cuando está
 * a la vista (IntersectionObserver), salvo con prefers-reduced-motion. Tiene botones de reproducir/pausar y de sonido.
 */
function ReelTile({ reel }: { reel: Extract<ElementoGaleria, { tipo: "reel" }> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sonido, setSonido] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Con prefers-reduced-motion no se reproduce solo: queda el poster y el botón de reproducir
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const alternarReproduccion = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };
  const alternarSonido = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setSonido(!video.muted);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        aria-label={reel.alt}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-between p-3">
        <button type="button" onClick={alternarReproduccion} aria-label={reproduciendo ? "Pausar video" : "Reproducir video"} className={botonReel}>
          {reproduciendo ? <Pause aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <Play aria-hidden="true" className="size-5" strokeWidth={1.5} />}
        </button>
        <button type="button" onClick={alternarSonido} aria-pressed={sonido} aria-label={sonido ? "Silenciar video" : "Activar sonido del video"} className={botonReel}>
          {sonido ? <Volume2 aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <VolumeX aria-hidden="true" className="size-5" strokeWidth={1.5} />}
        </button>
      </div>
    </div>
  );
}

/**
 * Galería en mosaico con fotos y reels en la misma grilla, en el orden de la lista. Las fotos abren un lightbox con
 * <dialog> (mismas animaciones que el modal de WhatsApp): flechas del teclado y botones, Escape, clic en el margen y
 * swipe en mobile; el foco vuelve a la miniatura. Los reels se reproducen en el lugar.
 */
export function CaseGallery({ elementos }: { elementos: ElementoGaleria[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toqueX = useRef<number | null>(null);
  const [indice, setIndice] = useState(0);
  // El lightbox recorre solo las imágenes; cada una recuerda su posición entre ellas
  const imagenes: ImagenGaleria[] = elementos.filter((e): e is ImagenGaleria & { tipo?: "imagen" } => e.tipo !== "reel");
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
          {(() => {
            let n = 0; // índice entre imágenes (para el lightbox)
            return elementos.map((el, pos) => {
              if (el.tipo === "reel") {
                return (
                  <li key={`reel-${el.src}-${pos}`} className="mosaico-vertical">
                    <ReelTile reel={el} />
                  </li>
                );
              }
              const i = n++;
              const formato = el.formato ?? "horizontal";
              return (
                <li key={`${el.src}-${pos}`} className={cn(formato === "horizontal" && "mosaico-horizontal", formato === "vertical" && "mosaico-vertical")}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`Ampliar imagen: ${el.alt}`}
                    onClick={() => abrir(i)}
                    className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={el.src}
                      alt={el.alt}
                      fill
                      sizes={formato === "horizontal" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </li>
              );
            });
          })()}
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
