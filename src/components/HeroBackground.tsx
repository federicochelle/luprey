import Image from "next/image";

const SEGUNDOS_POR_IMAGEN = 6; // tiempo que dura cada imagen
const SEGUNDOS_FUNDIDO = 1; // duración del crossfade

/**
 * Fondo del hero: imágenes a pantalla completa con crossfade solo con CSS,
 * más una capa negra (65%) para que el texto crema cumpla contraste AA.
 * - 1 imagen: sin animación.
 * - prefers-reduced-motion: queda fija la primera.
 * Las imágenes son decorativas (alt vacío); solo la primera lleva priority.
 */
export function HeroBackground({ images }: { images: readonly string[] }) {
  const n = images.length;
  const animar = n > 1;

  // Keyframes según la cantidad de imágenes (los porcentajes dependen de n).
  // Cada slide: sube en el fundido, se mantiene, baja justo cuando entra la siguiente.
  const ciclo = n * SEGUNDOS_POR_IMAGEN;
  const subida = (SEGUNDOS_FUNDIDO / ciclo) * 100;
  const tramo = 100 / n;
  const css = animar
    ? `@keyframes hero-fade{0%{opacity:0}${subida.toFixed(2)}%{opacity:1}${tramo.toFixed(2)}%{opacity:1}${(tramo + subida).toFixed(2)}%{opacity:0}100%{opacity:0}}` +
      `.hero-slide{opacity:0;animation:hero-fade ${ciclo}s linear infinite;animation-delay:var(--hero-delay)}` +
      `.hero-slide:first-of-type{opacity:1}` +
      `@media (prefers-reduced-motion:reduce){.hero-slide{animation:none}}`
    : "";

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      {animar && <style dangerouslySetInnerHTML={{ __html: css }} />}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={animar ? "hero-slide object-cover" : "object-cover"}
          // La primera arranca ya visible (delay negativo = adelantada un fundido); las demás entran de a una
          style={animar ? ({ "--hero-delay": `${i * SEGUNDOS_POR_IMAGEN - SEGUNDOS_FUNDIDO}s` } as React.CSSProperties) : undefined}
        />
      ))}
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
}
