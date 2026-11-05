"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Reel } from "@/content/casos";

const boton =
  "flex size-10 items-center justify-center rounded-full border border-crema/40 bg-black/55 text-crema transition-colors hover:bg-black/80";

/**
 * Un reel vertical 9:16, muted y en loop. Se reproduce solo cuando está a la vista (IntersectionObserver),
 * salvo con prefers-reduced-motion. Tiene botones de reproducir/pausar y de sonido.
 */
function ReelItem({ reel }: { reel: Reel }) {
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
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black">
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
        <button type="button" onClick={alternarReproduccion} aria-label={reproduciendo ? "Pausar video" : "Reproducir video"} className={boton}>
          {reproduciendo ? <Pause aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <Play aria-hidden="true" className="size-5" strokeWidth={1.5} />}
        </button>
        <button type="button" onClick={alternarSonido} aria-pressed={sonido} aria-label={sonido ? "Silenciar video" : "Activar sonido del video"} className={boton}>
          {sonido ? <Volume2 aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <VolumeX aria-hidden="true" className="size-5" strokeWidth={1.5} />}
        </button>
      </div>
    </div>
  );
}

/** Fila de reels: scroll horizontal en mobile. */
export function CaseReels({ reels }: { reels: Reel[] }) {
  return (
    <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
      {reels.map((r) => (
        <li key={r.src} className="w-[68vw] max-w-64 shrink-0 snap-center sm:w-64">
          <ReelItem reel={r} />
        </li>
      ))}
    </ul>
  );
}
